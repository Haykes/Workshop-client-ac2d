<?php

namespace App\Service;

use App\Entity\Field;
use App\Entity\FieldOption;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

readonly class ExcelImporterService
{
    public function __construct(private EntityManagerInterface $em) {}

    public function import(string $filePath): void
    {
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();

        $highestColumnIndex = Coordinate::columnIndexFromString($sheet->getHighestColumn());
        $highestRow = $sheet->getHighestRow();

        $fields = $this->extractFieldsFromHeader($sheet, $highestColumnIndex);

        for ($row = 2; $row <= $highestRow; $row++) {
            foreach ($fields as $col => $field) {
                $value = $this->clean($sheet->getCell(Coordinate::stringFromColumnIndex($col) . $row)->getValue());

                if ($value === '') {
                    continue;
                }

                $this->extractFieldOption($field, $value);
            }
        }

        $this->em->flush();
    }

    private function extractFieldsFromHeader(Worksheet $sheet, int $maxCol): array
    {
        $fields = [];

        for ($col = 1; $col <= $maxCol; $col++) {
            $columnLetter = Coordinate::stringFromColumnIndex($col);
            $header = $this->clean($sheet->getCell($columnLetter . '1')->getValue());

            if ($header !== '') {
                $fields[$col] = $this->getOrCreateField($header);
            }
        }

        return $fields;
    }

    private function extractFieldOption(Field $field, string $label): void
    {
        $repo = $this->em->getRepository(FieldOption::class);

        $existing = $repo->findOneBy([
            'field' => $field,
            'label' => $label
        ]);

        if ($existing !== null) {
            return;
        }

        $option = new FieldOption();
        $option->setField($field);
        $option->setLabel($label);
        $this->em->persist($option);
    }

    private function getOrCreateField(string $label): Field
    {
        $repo = $this->em->getRepository(Field::class);

        $existing = $repo->findOneBy(['label' => $label]);

        if ($existing !== null) {
            return $existing;
        }

        $field = new Field();
        $field->setLabel($label);
        $this->em->persist($field);

        return $field;
    }

    private function clean(mixed $value): string
    {
        return trim((string) $value);
    }
}

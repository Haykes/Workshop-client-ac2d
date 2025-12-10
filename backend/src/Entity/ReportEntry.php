<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Dto\ReportEntryOutput;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
#[ApiResource(
    operations: [
        new GetCollection(output: ReportEntryOutput::class),
        new Get(output: ReportEntryOutput::class)
    ]
)]
class ReportEntry
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\ManyToOne(targetEntity: Report::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Report $report;

    #[ORM\ManyToOne(targetEntity: Field::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Field $field;

    #[ORM\ManyToOne(targetEntity: FieldOption::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?FieldOption $fieldOption = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $expectedResult;

    #[ORM\Column(type: 'string', length: 255)]
    private string $actualResult;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $testedAt;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getReport(): Report
    {
        return $this->report;
    }

    public function setReport(Report $report): void
    {
        $this->report = $report;
    }

    public function getField(): Field
    {
        return $this->field;
    }

    public function setField(Field $field): void
    {
        $this->field = $field;
    }

    public function getFieldOption(): ?FieldOption
    {
        return $this->fieldOption;
    }

    public function setFieldOption(?FieldOption $fieldOption): void
    {
        $this->fieldOption = $fieldOption;
    }

    public function getExpectedResult(): string
    {
        return $this->expectedResult;
    }

    public function setExpectedResult(string $expectedResult): void
    {
        $this->expectedResult = $expectedResult;
    }

    public function getActualResult(): string
    {
        return $this->actualResult;
    }

    public function setActualResult(string $actualResult): void
    {
        $this->actualResult = $actualResult;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): void
    {
        $this->comment = $comment;
    }

    public function getTestedAt(): \DateTimeImmutable
    {
        return $this->testedAt;
    }

    public function setTestedAt(\DateTimeImmutable $testedAt): void
    {
        $this->testedAt = $testedAt;
    }
}

<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\ReportEntryResource;
use App\Entity\ReportEntry;
use Doctrine\ORM\EntityManagerInterface;

readonly class ReportEntryProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|ReportEntryResource|null
    {
        if (isset($uriVariables['id'])) {
            $reportEntry = $this->entityManager->getRepository(ReportEntry::class)->find($uriVariables['id']);
            return $reportEntry ? ReportEntryResource::fromEntity($reportEntry) : null;
        }

        $reportEntries = $this->entityManager->getRepository(ReportEntry::class)->findAll();

        return array_map(static fn(ReportEntry $entry) => ReportEntryResource::fromEntity($entry), $reportEntries);
    }
}
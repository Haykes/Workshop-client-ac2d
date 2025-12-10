<?php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\ReportResource;
use App\Entity\Report;
use Doctrine\ORM\EntityManagerInterface;

readonly class ReportProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|ReportResource|null
    {
        if (isset($uriVariables['id'])) {
            $report = $this->entityManager->getRepository(Report::class)->find($uriVariables['id']);
            return $report ? ReportResource::fromEntity($report) : null;
        }

        $reports = $this->entityManager->getRepository(Report::class)->findAll();

        return array_map(static fn(Report $report) => ReportResource::fromEntity($report), $reports);
    }
}
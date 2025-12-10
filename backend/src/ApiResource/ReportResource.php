<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Report;
use App\State\ReportEntryProvider;
use App\State\ReportProvider;

#[ApiResource(
    shortName: 'Report',
    operations: [
        new Get(provider: ReportProvider::class),
        new GetCollection(provider: ReportProvider::class)
    ]
)]
class ReportResource
{
    public int $id;
    public int $userId;

    public static function fromEntity(Report $report): self
    {
        $resource = new self();
        $resource->id = $report->getId();
        $resource->userId = $report->getUser()->getId();

        return $resource;
    }
}

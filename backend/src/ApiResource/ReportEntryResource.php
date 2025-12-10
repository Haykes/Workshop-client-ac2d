<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\ReportEntry;
use App\State\FieldOptionProvider;
use App\State\ReportEntryProvider;

#[ApiResource(
    shortName: 'ReportEntry',
    operations: [
        new Get(provider: ReportEntryProvider::class),
        new GetCollection(provider: ReportEntryProvider::class)
    ]
)]
class ReportEntryResource
{
    public int $id;
    public int $reportId;
    public int $fieldId;
    public ?int $fieldOptionId;
    public string $expectedResult;
    public string $actualResult;
    public ?string $comment;
    public \DateTimeImmutable $testedAt;

    public static function fromEntity(ReportEntry $entry): self
    {
        $resource = new self();
        $resource->id = $entry->getId();
        $resource->reportId = $entry->getReport()->getId();
        $resource->fieldId = $entry->getField()->getId();
        $resource->fieldOptionId = $entry->getFieldOption()?->getId();
        $resource->expectedResult = $entry->getExpectedResult();
        $resource->actualResult = $entry->getActualResult();
        $resource->comment = $entry->getComment();
        $resource->testedAt = $entry->getTestedAt();

        return $resource;
    }
}

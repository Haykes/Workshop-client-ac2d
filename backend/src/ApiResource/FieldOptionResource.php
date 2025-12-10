<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\FieldOption;
use App\State\FieldOptionProvider;

#[ApiResource(
    shortName: 'FieldOption',
    operations: [
        new Get(provider: FieldOptionProvider::class),
        new GetCollection(provider: FieldOptionProvider::class)
    ]
)]
class FieldOptionResource
{
    public int $id;
    public int $fieldId;
    public string $label;

    public static function fromEntity(FieldOption $option): self
    {
        $resource = new self();
        $resource->id = $option->getId();
        $resource->fieldId = $option->getField()->getId();
        $resource->label = $option->getLabel();

        return $resource;
    }
}

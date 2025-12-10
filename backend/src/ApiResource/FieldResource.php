<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Field;
use App\State\FieldProvider;

#[ApiResource(
    shortName: 'Field',
    operations: [
        new Get(provider: FieldProvider::class),
        new GetCollection(provider: FieldProvider::class)
    ]
)]
class FieldResource
{
    public int $id;
    public string $label;

    public static function fromEntity(Field $field): self
    {
        $resource = new self();
        $resource->id = $field->getId();
        $resource->label = $field->getLabel();

        return $resource;
    }
}

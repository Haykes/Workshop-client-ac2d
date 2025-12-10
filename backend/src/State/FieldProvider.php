<?php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\FieldResource;
use App\Entity\Field;
use Doctrine\ORM\EntityManagerInterface;

readonly class FieldProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|FieldResource|null
    {
        if (isset($uriVariables['id'])) {
            $field = $this->entityManager->getRepository(Field::class)->find($uriVariables['id']);
            return $field ? FieldResource::fromEntity($field) : null;
        }

        $fields = $this->entityManager->getRepository(Field::class)->findAll();

        return array_map(static fn(Field $field) => FieldResource::fromEntity($field), $fields);
    }
}
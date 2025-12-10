<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\FieldOptionResource;
use App\Entity\FieldOption;
use Doctrine\ORM\EntityManagerInterface;

readonly class FieldOptionProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): FieldOptionResource|array|null
    {
        $repository = $this->entityManager->getRepository(FieldOption::class);

        if (isset($uriVariables['id'])) {
            $fieldOption = $repository->find($uriVariables['id']);

            if (!$fieldOption) {
                return null;
            }

            return FieldOptionResource::fromEntity($fieldOption);
        }

        $fieldOptions = $repository->findAll();

        return array_map(static fn(FieldOption $fieldOption) => FieldOptionResource::fromEntity($fieldOption), $fieldOptions);
    }
}

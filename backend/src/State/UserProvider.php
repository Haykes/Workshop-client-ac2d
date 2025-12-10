<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\UserResource;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

readonly class UserProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|UserResource|null
    {
        if (isset($uriVariables['id'])) {
            $user = $this->entityManager->getRepository(User::class)->find($uriVariables['id']);
            return $user ? UserResource::fromEntity($user) : null;
        }

        $users = $this->entityManager->getRepository(User::class)->findAll();

        return array_map(static fn(User $user) => UserResource::fromEntity($user), $users);
    }
}
<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\User;
use App\State\UserProvider;

#[ApiResource(
    operations: [
        new GetCollection(provider: UserProvider::class),
        new Get(provider: UserProvider::class)
    ]
)]

class UserResource
{
    public int $id;
    public string $firstName;
    public string $lastName;
    public string $email;

    public static function fromEntity(User $user): self
    {
        $resource = new self();
        $resource->id = $user->getId();
        $resource->firstName = $user->getFirstName();
        $resource->lastName = $user->getLastName();
        $resource->email = $user->getEmail();

        return $resource;
    }
}

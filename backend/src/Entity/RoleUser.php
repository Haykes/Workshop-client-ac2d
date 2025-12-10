<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class RoleUser
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: User::class)]
    private User $user;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: Role::class)]
    private Role $role;

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getRole(): Role
    {
        return $this->role;
    }

    public function setRole(Role $role): void
    {
        $this->role = $role;
    }
}
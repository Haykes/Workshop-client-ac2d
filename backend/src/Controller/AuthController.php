<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    #[Route('/api/auth/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        SessionInterface $session,
        UserPasswordHasherInterface $passwordHasher,
    ): JsonResponse {
        $payload = json_decode($request->getContent() ?: '{}', true) ?? [];

        $email = $payload['email'] ?? '';
        $password = $payload['password'] ?? '';

        /** @var User|null $user */
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Identifiants invalides',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Renew the session to prevent fixation before storing the authenticated user
        $session->migrate(true);
        $session->set('user_id', $user->getId());

        return new JsonResponse([
            'success' => true,
            'user' => $this->formatUser($user),
        ]);
    }

    #[Route('/api/auth/me', name: 'api_me', methods: ['GET'])]
    public function me(SessionInterface $session): JsonResponse
    {
        $userId = $session->get('user_id');

        if (!$userId) {
            return new JsonResponse([
                'authenticated' => false,
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User|null $user */
        $user = $this->userRepository->find($userId);

        if (!$user) {
            $session->invalidate();

            return new JsonResponse([
                'authenticated' => false,
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'authenticated' => true,
            'user' => $this->formatUser($user),
        ]);
    }

    #[Route('/api/auth/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(SessionInterface $session): JsonResponse
    {
        $session->invalidate();

        return new JsonResponse([
            'success' => true,
        ]);
    }

    /**
     * @return array{ id: int|null, email: string, firstName: string, lastName: string, roles: array<int, string> }
     */
    private function formatUser(User $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'roles' => $user->getRoles(),
        ];
    }
}

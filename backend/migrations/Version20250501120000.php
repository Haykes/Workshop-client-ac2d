<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250501120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Seed admin user and default roles for authentication';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO role (label) SELECT 'ROLE_ADMIN' WHERE NOT EXISTS (SELECT 1 FROM role WHERE label = 'ROLE_ADMIN')");
        $this->addSql("INSERT INTO role (label) SELECT 'ROLE_TECHNICIAN' WHERE NOT EXISTS (SELECT 1 FROM role WHERE label = 'ROLE_TECHNICIAN')");
        $this->addSql(<<<'SQL'
INSERT INTO "user" (first_name, last_name, email, password)
SELECT 'Admin', 'AC2D', 'admin@ac2d.com', '$2y$12$Oz9Chs7itVxxEl4V8cRGUueHeONWQIMnLFn0balzkiLFdWChRJSk6'
WHERE NOT EXISTS (SELECT 1 FROM "user" WHERE email = 'admin@ac2d.com')
SQL);
        $this->addSql(<<<'SQL'
INSERT INTO role_user (user_id, role_id)
SELECT u.id, r.id
FROM "user" u
CROSS JOIN role r
WHERE u.email = 'admin@ac2d.com'
  AND r.label = 'ROLE_ADMIN'
  AND NOT EXISTS (
        SELECT 1 FROM role_user ru
        JOIN role r2 ON r2.id = ru.role_id
        WHERE ru.user_id = u.id
          AND r2.label = 'ROLE_ADMIN'
    )
SQL);
        $this->addSql("SELECT setval('user_id_seq', (SELECT COALESCE(MAX(id), 1) FROM \"user\"), true)");
        $this->addSql("SELECT setval('role_id_seq', (SELECT COALESCE(MAX(id), 1) FROM role), true)");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM role_user WHERE user_id IN (SELECT id FROM \"user\" WHERE email = 'admin@ac2d.com')");
        $this->addSql("DELETE FROM \"user\" WHERE email = 'admin@ac2d.com'");
        $this->addSql("DELETE FROM role WHERE label IN ('ROLE_ADMIN', 'ROLE_TECHNICIAN')");
    }
}

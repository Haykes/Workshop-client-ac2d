<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250414124536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE field (id SERIAL NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE field_option (id SERIAL NOT NULL, field_id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_70C28CB2443707B0 ON field_option (field_id)');
        $this->addSql('CREATE TABLE report (id SERIAL NOT NULL, user_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C42F7784A76ED395 ON report (user_id)');
        $this->addSql('CREATE TABLE report_entry (id SERIAL NOT NULL, report_id INT NOT NULL, field_id INT NOT NULL, field_option_id INT DEFAULT NULL, expected_result VARCHAR(255) NOT NULL, actual_result VARCHAR(255) NOT NULL, comment VARCHAR(255) DEFAULT NULL, tested_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_13D9A094BD2A4C0 ON report_entry (report_id)');
        $this->addSql('CREATE INDEX IDX_13D9A09443707B0 ON report_entry (field_id)');
        $this->addSql('CREATE INDEX IDX_13D9A0942C79BE5 ON report_entry (field_option_id)');
        $this->addSql('COMMENT ON COLUMN report_entry.tested_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE role (id SERIAL NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE role_user (user_id INT NOT NULL, role_id INT NOT NULL, PRIMARY KEY(user_id, role_id))');
        $this->addSql('CREATE INDEX IDX_332CA4DDA76ED395 ON role_user (user_id)');
        $this->addSql('CREATE INDEX IDX_332CA4DDD60322AC ON role_user (role_id)');
        $this->addSql('CREATE TABLE "user" (id SERIAL NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE field_option ADD CONSTRAINT FK_70C28CB2443707B0 FOREIGN KEY (field_id) REFERENCES field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_entry ADD CONSTRAINT FK_13D9A094BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_entry ADD CONSTRAINT FK_13D9A09443707B0 FOREIGN KEY (field_id) REFERENCES field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_entry ADD CONSTRAINT FK_13D9A0942C79BE5 FOREIGN KEY (field_option_id) REFERENCES field_option (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE role_user ADD CONSTRAINT FK_332CA4DDA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE role_user ADD CONSTRAINT FK_332CA4DDD60322AC FOREIGN KEY (role_id) REFERENCES role (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE field_option DROP CONSTRAINT FK_70C28CB2443707B0');
        $this->addSql('ALTER TABLE report DROP CONSTRAINT FK_C42F7784A76ED395');
        $this->addSql('ALTER TABLE report_entry DROP CONSTRAINT FK_13D9A094BD2A4C0');
        $this->addSql('ALTER TABLE report_entry DROP CONSTRAINT FK_13D9A09443707B0');
        $this->addSql('ALTER TABLE report_entry DROP CONSTRAINT FK_13D9A0942C79BE5');
        $this->addSql('ALTER TABLE role_user DROP CONSTRAINT FK_332CA4DDA76ED395');
        $this->addSql('ALTER TABLE role_user DROP CONSTRAINT FK_332CA4DDD60322AC');
        $this->addSql('DROP TABLE field');
        $this->addSql('DROP TABLE field_option');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE report_entry');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE role_user');
        $this->addSql('DROP TABLE "user"');
    }
}

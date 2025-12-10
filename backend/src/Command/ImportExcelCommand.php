<?php

namespace App\Command;

use App\Service\ExcelImporterService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import-excel',
    description: 'Importe les données depuis un fichier Excel vers la BDD.'
)]
class ImportExcelCommand extends Command
{
    public function __construct(private readonly ExcelImporterService $excelImporterService)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->addArgument('filepath', InputArgument::REQUIRED, 'Le chemin vers le fichier Excel à importer.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $filePath = $input->getArgument('filepath');

        if (!file_exists($filePath)) {
            $output->writeln('<error>Le fichier spécifié est introuvable !</error>');
            return Command::FAILURE;
        }

        try {
            $output->writeln('<info>Importation démarrée...</info>');
            $this->excelImporterService->import($filePath);
            $output->writeln('<info>Importation terminée avec succès !</info>');
            return Command::SUCCESS;
        } catch (\Throwable $e) {
            $output->writeln('<error>Erreur lors de l’import : ' . $e->getMessage() . '</error>');
            return Command::FAILURE;
        }
    }
}

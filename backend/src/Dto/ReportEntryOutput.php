<?php

namespace App\Dto;

class ReportEntryOutput
{
    public int $id;
    public int $reportId;
    public int $fieldId;
    public ?int $fieldOptionId;
    public string $expectedResult;
    public string $actualResult;
    public ?string $comment;
    public \DateTimeImmutable $testedAt;
}
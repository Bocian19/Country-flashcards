<?php

namespace App\Entity;

use App\Repository\ResultRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * @ORM\Entity(repositoryClass=ResultRepository::class)
 */
class Result
{
    public function __construct(){
        $this->date = new \DateTime("now");

    }
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="integer")
     */
    private $correct_answer;

    /**
     * @ORM\Column(type="integer")
     */
    private $not_correct_answer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCorrectAnswer(): ?int
    {
        return $this->correct_answer;
    }

    public function setCorrectAnswer(int $correct_answer): self
    {
        $this->correct_answer = $correct_answer;

        return $this;
    }

    public function getNotCorrectAnswer(): ?int
    {
        return $this->not_correct_answer;
    }

    public function setNotCorrectAnswer(int $not_correct_answer): self
    {
        $this->not_correct_answer = $not_correct_answer;

        return $this;
    }
}

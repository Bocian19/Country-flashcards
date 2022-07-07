<?php

namespace App\Controller;

use App\Entity\Country;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class QuizController extends AbstractController
{
    /**
     * @Route("/quiz", name="quiz")
     */
    public function start(ManagerRegistry $doctrine)
    {
        $all_countries = $doctrine->getRepository(Country::class)->findAll();
        shuffle($all_countries);
        $quiz_countries = array_slice($all_countries, 0, 5);

        return $this->render('quiz.html.twig', [
            'countries' => $quiz_countries
        ]);

    }

}
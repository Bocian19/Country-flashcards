<?php

namespace App\Controller;

use App\Entity\Result;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ResultController extends AbstractController
{

    /**
     * @Route("/save-results", name="save-results")
     */
    public function save(ManagerRegistry $doctrine, Request $request)
    {

        $entityManager = $doctrine->getManager();

        $correct_answers = $request->request->get('correct_answers');
        $bad_answers = $request->request->get('bad_answers');

        $result = new Result();
        $result->setCorrectAnswer($correct_answers);
        $result->setNotCorrectAnswer($bad_answers);

        $entityManager->persist($result);
        $entityManager->flush();

        return $this->render('homepage.html.twig', [
            'bad_answers' => $bad_answers,
            'correct_answers' => $correct_answers
        ]);

    }


    /**
     * @Route("/show-results", name="show-results", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine)
    {
        $results = $doctrine->getRepository(Result::class)->findAll();

        return $this->render('results.html.twig', [
            'results' => $results
        ]);

    }

}
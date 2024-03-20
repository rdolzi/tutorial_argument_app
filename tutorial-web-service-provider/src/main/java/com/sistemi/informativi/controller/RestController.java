package com.sistemi.informativi.controller;


import com.sistemi.informativi.entity.Argument;
import com.sistemi.informativi.entity.Tutorial;
import com.sistemi.informativi.exception.ArgumentException;
import com.sistemi.informativi.exception.TutorialException;
import com.sistemi.informativi.service.ArgumentService;
import com.sistemi.informativi.service.TutorialService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@org.springframework.web.bind.annotation.RestController
@RequestMapping("rest/api/tutorials")
public class RestController {

    private final TutorialService tutorialService;
    private final ArgumentService argumentService;

    public RestController(TutorialService tutorialService, ArgumentService argumentService) {
        this.tutorialService = tutorialService;
        this.argumentService = argumentService;
    }


    // GET /rest/api/tutorials
    // http://localhost/rest/api/tutorials
    // JSON di risposta contenente tutti i tutorial presenti sul sistema;
    @GetMapping
    public List<Tutorial> findAllTutorials() throws TutorialException {
        return tutorialService.checkFindAllTutorials();
    }


    // GET /rest/tutorials/{id}
    // http://localhost/rest/api/tutorials/{id}
    //JSON di risposta contenente un tutorial per chiave primaria;
    @GetMapping("/{id}")
    public Tutorial findTutorialById(@PathVariable int id) throws TutorialException {
        return tutorialService.checkFindTutorialById(id);
    }

    //POST /rest/api/tutorials
    // http://localhost/rest/api/tutorials/
    //JSON di risposta contenente un nuovo Tutorial inserito nel sistema;
    @PostMapping
    public Tutorial saveTutorial(@Valid @RequestBody Tutorial tutorial){
        return tutorialService.checkSaveOrUpdate(tutorial);
    }

    //DELETE /rest/api/tutorials
    //JSON di risposta contenente il messaggio di avvenuta cancellazione di un JSON presente nel sistema;.
    @PutMapping
    public Tutorial updateTutorial(@RequestBody Tutorial tutorial){
        return tutorialService.checkSaveOrUpdate(tutorial);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTutorial(@PathVariable  int id){
        return tutorialService.checkRemoveTutorial(id);
    }

    // GET /rest/api/tutorials/{id}/arguments
    @GetMapping("/{id}/arguments")
    public List<Argument> findAllArgumentsByTutorialId(@PathVariable int id) throws ArgumentException {
        return argumentService.checkFindAllArgumentsByTutorialId(id);
    }

    //POST /rest/api/tutorials/{id}/argument
    // http://localhost/rest/api/tutorials/{id}/argument
    @PostMapping("/{id}/arguments")
    public Argument saveArgument(@PathVariable int id, @Valid @RequestBody Argument argument) throws TutorialException {

        Tutorial tutorial = tutorialService.checkFindTutorialById(id);
        if (tutorial == null) {
            throw new TutorialException("Tutorial not found with id: " + id);
        }
        return argumentService.checkSaveOrUpdate(new Argument(argument.getTechnology(),tutorial));
    }

    //PUT /rest/api/tutorials/{id}/argument
    // http://localhost/rest/api/tutorials/
    @PutMapping("/{id}/arguments")
    public Argument updateArgument(@PathVariable int id, @RequestBody Argument argument) throws TutorialException {

        Tutorial tutorial = tutorialService.checkFindTutorialById(id);
        if (tutorial == null) {
            throw new TutorialException("Tutorial not found with id: " + id);
        }
        System.out.println(tutorial);
        return argumentService.checkSaveOrUpdate(new Argument(argument.getId(),argument.getTechnology(),tutorial));
    }

    // http://localhost/rest/api/tutorials/{id}/arguments/{id}
    //JSON di risposta contenente un tutorial per chiave primaria;
    @GetMapping("/{idA}/arguments/{idB}")
    public Argument findArgumentById(@PathVariable  int idA, @PathVariable  int idB) throws TutorialException {
        return tutorialService.checkFindTutorialById(idA)
                .getArguments()
                .stream()
                .filter(argument -> argument.getId() == idB)
                .findFirst()
                .orElse(null);
    }
    // should be /api/rest/arguments/{id}
    // need to divide RestController in : TutorialController and ArgumentController
    @DeleteMapping("/arguments/{id}")
    public Map<String, Boolean> deleteArgument(@PathVariable  int id){
        return argumentService.checkRemoveArgument(id);
    }
}


/*





Prevedere la gestione centralizzata delle Eccezioni,
 la documentazione delle operazioni esposte
 e la validazione del JSON in ingresso per le operazioni
 di inserimento e aggiornamento di un nuovo tutorial.
 Testare con Postman tutte le chiamate Rest.
 */

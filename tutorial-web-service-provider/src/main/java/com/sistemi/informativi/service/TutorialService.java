package com.sistemi.informativi.service;

import com.sistemi.informativi.entity.Tutorial;
import com.sistemi.informativi.exception.TutorialException;

import java.util.List;
import java.util.Map;


public interface TutorialService {

    /*
        best pratice:
        nei service layer, i metodi è importante che restituiscano oggetti
    */
    public Tutorial checkSaveOrUpdate(Tutorial tutorial);
    public List<Tutorial> checkFindAllTutorials() throws TutorialException;

    public Tutorial checkFindTutorialById(int id) throws TutorialException;

    public Map<String, Boolean> checkRemoveTutorial(int id);
}

package com.sistemi.informativi.service;

import com.sistemi.informativi.entity.Tutorial;
import com.sistemi.informativi.exception.TutorialException;
import com.sistemi.informativi.repository.TutorialRepository;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class TutorialServiceImpl implements TutorialService{

    private final TutorialRepository tutorialRepository;

    public TutorialServiceImpl(TutorialRepository tutorialRepository) {
        this.tutorialRepository = tutorialRepository;
    }


    @Override
    public Tutorial checkSaveOrUpdate(Tutorial tutorial) {
        Tutorial saveOrUpdate = null;
        try{
            saveOrUpdate = tutorialRepository.save(tutorial);
        } catch (IllegalArgumentException | OptimisticLockingFailureException ex){
            ex.printStackTrace();
        }
        return saveOrUpdate;
    }

    @Override
    public List<Tutorial> checkFindAllTutorials() throws TutorialException {
        List<Tutorial> academies = tutorialRepository.findAll();
        if (academies.isEmpty()) throw new TutorialException("no tutorials found");
        return academies;
    }

    @Override
    public Tutorial checkFindTutorialById(int id) throws TutorialException {
        return tutorialRepository.findById(id).orElseThrow((()-> new TutorialException("tutorial not present")));
    }

    @Override
    public Map<String, Boolean> checkRemoveTutorial(int id) {

        Map<String, Boolean> removeMap = new HashMap<>();
        try{
            tutorialRepository.deleteById(id);
            removeMap.put("deletion",true);
        } catch (IllegalArgumentException ex){
            removeMap.put("deletion",false);
            ex.printStackTrace();
        }
        return removeMap;
    }
}

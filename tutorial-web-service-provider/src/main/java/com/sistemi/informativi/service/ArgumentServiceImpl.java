package com.sistemi.informativi.service;

import com.sistemi.informativi.entity.Argument;
import com.sistemi.informativi.entity.Tutorial;
import com.sistemi.informativi.exception.ArgumentException;
import com.sistemi.informativi.exception.TutorialException;
import com.sistemi.informativi.repository.ArgumentRepository;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArgumentServiceImpl implements  ArgumentService{

    private final ArgumentRepository argumentRepository;

    public ArgumentServiceImpl(ArgumentRepository argumentRepository) {
        this.argumentRepository = argumentRepository;
    }

    public List<Argument> checkFindAllArgumentsByTutorialId(int id) throws ArgumentException{

        List<Argument> arguments = argumentRepository.findAllByTutorialId(id);
        if (arguments.isEmpty()) throw new ArgumentException("no arguments found");
        return arguments;

    }

    public Argument checkSaveOrUpdate(Argument argument) {
        Argument saveOrUpdate = null;
        try{
            saveOrUpdate = argumentRepository.save(argument);
        } catch (IllegalArgumentException | OptimisticLockingFailureException ex){
            ex.printStackTrace();
        }
        return saveOrUpdate;
    }

    @Override
    public Map<String, Boolean> checkRemoveArgument(int id) {
        Map<String, Boolean> removeMap = new HashMap<>();
        try{
            argumentRepository.deleteArgumentsById(id);
            removeMap.put("deletion",true);
        } catch (IllegalArgumentException ex){
            removeMap.put("deletion",false);
            ex.printStackTrace();
        }
        return removeMap;
    }


}

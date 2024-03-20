package com.sistemi.informativi.service;

import com.sistemi.informativi.entity.Argument;
import com.sistemi.informativi.entity.Tutorial;
import com.sistemi.informativi.exception.ArgumentException;
import com.sistemi.informativi.exception.TutorialException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface ArgumentService {

    public Argument checkSaveOrUpdate(Argument argument);
    public Map<String, Boolean> checkRemoveArgument(int id);
    public List<Argument> checkFindAllArgumentsByTutorialId(int id) throws ArgumentException;
}

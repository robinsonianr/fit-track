package com.robinsonir.fittrack.audit;

import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;

public class FitTrackRevisionListener implements RevisionListener {
    @Override
    public void newRevision(Object revisionEntity) {
        FitTrackRevisionEntity rev = (FitTrackRevisionEntity) revisionEntity;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = (auth != null) ? auth.getName() : "System";
        rev.setUsername(currentUser);
    }
}

package com.proj.backend.Security;

import com.proj.backend.model.Personne;
import com.proj.backend.repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PersonneRepository personneRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String Email)
            throws UsernameNotFoundException {
        // Let people login with either username or email
        Personne personne = personneRepository.findByEmail(Email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + Email)
                );

        return UserPrincipal.create(personne);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        Personne personne = personneRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserPrincipal.create(personne);
    }
}

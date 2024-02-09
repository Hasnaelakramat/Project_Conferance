//package com.proj.backend.repository;
//
//import com.proj.backend.model.Conference;
//import com.proj.backend.model.Formateur;
//import com.proj.backend.model.Niveau;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ConferenceRepository extends JpaRepository<Conference, Long> {
//    List<Conference> findByFormateur_Id(Long formateurId);
//
//    List<Conference> findByStatus(int i);
//
//
//    Optional<Conference> findByTitle(String title);
//
//    List<Conference> findByCategorie(String categorie);
//
//    List<Conference> findByNiveau(Niveau niveau);
//
//    List<Conference> findByVille(String ville);
//}
package com.proj.backend.repository;

import com.proj.backend.model.Conference;
import com.proj.backend.model.Formateur;
import com.proj.backend.model.Niveau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
    List<Conference> findByFormateur_Id(Long formateurId);

    List<Conference> findByStatus(int i);


    Optional<Conference> findByTitle(String title);

    List<Conference> findByCategorie(String categorie);

    List<Conference> findByNiveau(Niveau niveau);

    List<Conference> findByVille(String ville);

    @Query("SELECT c from Conference c join c.utilisateursInscrits u WHERE u.id = :userId")
    List<Conference> findByUtilisateursInscritsId(Long userId);
}

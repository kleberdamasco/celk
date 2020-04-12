package br.com.kleber.celk;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("br.com.kleber.celk");

        noClasses()
            .that()
                .resideInAnyPackage("br.com.kleber.celk.service..")
            .or()
                .resideInAnyPackage("br.com.kleber.celk.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..br.com.kleber.celk.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}

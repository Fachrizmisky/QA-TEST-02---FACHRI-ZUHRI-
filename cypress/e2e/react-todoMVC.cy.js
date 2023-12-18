describe("Testing website REACT TODO-MVC", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/react/#/");
    cy.clearCookies();
  });

  it("User visit URL", () => {
    cy.url().should("include", "/examples/react/#/");
    cy.get("h3").contains("React");
  });

  it("User adding task", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .clear()
      .type("Go to H Club SCBD{enter}");
    cy.get(".view > label").should("contain.text", "Go to H Club SCBD");

    cy.get('input[placeholder="What needs to be done?"]')
      .clear()
      .type("Buy a bottle of Singleton{enter}");
    cy.get(".view > label").should("contain.text", "Buy a bottle of Singleton");

    cy.get('input[placeholder="What needs to be done?"]')
      .clear()
      .type("Dance the night out!{enter}");
    cy.get(".view > label").should("contain.text", "Dance the night out!");

    context("Complete task", () => {
      cy.wait(1000);
      cy.get('.view > input.toggle[type="checkbox"]')
        .should("exist")
        .eq(0)
        .click();
      cy.get(".completed > .view > label").eq(0).should("be.visible");
    });

    context("Delete task", () => {
      cy.wait(1000);
      cy.get("button.destroy").should("exist").eq(1).click({ force: true });
      cy.get(".view > label").should(
        "not.contain.text",
        "Buy a bottle of Singleton"
      );
    });
    context("Filter task", () => {
      cy.get('a[href="#/active"]').should("exist").contains("Active").click();
      cy.get(".view > label").should("contain.text", "Dance the night out!");

      cy.get('a[href="#/completed"]')
        .should("exist")
        .contains("Completed")
        .click();
      cy.get(".completed > .view > label").eq(0).should("be.visible");
    });
    context("Clear completed", () => {
      cy.get("button.clear-completed").should("exist").click();
      cy.get(".view > label").should("not.exist");
    });
  });
});

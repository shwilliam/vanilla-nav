{
  window.onload = () => {
    const menuToggleEl = document.getElementById('menu-toggle')
    const menuEl = document.getElementById('menu')
    const menuListEl = document.getElementById('menu-list')
    const {
      length: l,
      0: menuItemFirstEl,
      [l - 1]: menuItemLastEl
    } = menuListEl.children

    menuToggleEl.onclick = ({ target }) => {
      const isOpening = target.checked

      if (isOpening) {
        // open menu
        menuEl.setAttribute('aria-expanded', true)
        menuEl.setAttribute('aria-hidden', false)

        // trap tab navigation within menu
        menuItemLastEl.onkeydown = e => {
          if (e.keyCode === 9 && !e.shiftKey) {
            menuToggleEl.focus()
            e.preventDefault()
          }
        }

        menuToggleEl.onkeydown = e => {
          if (e.keyCode === 9 && e.shiftKey) {
            // assumes focusable el is first child of menu list item
            menuItemLastEl.children[0].focus()
            e.preventDefault()
          }
        }

        // lock scroll
        const { scrollX, scrollY } = window
        window.onscroll = () => window.scrollTo(scrollX, scrollY)

        // enable tab navigation
        for (
          let i = 0, menuListLength = menuListEl.children.length;
          i < menuListLength;
          i++
        ) {
          const menuListItemEl = menuListEl.children[i]
          menuListItemEl.children[0].setAttribute('tabindex', 0)
        }
      } else {
        // close menu
        menuEl.setAttribute('aria-expanded', false)
        menuEl.setAttribute('aria-hidden', true)

        // enable scroll
        window.onscroll = null

        // clear menu toggle tab nav listener
        menuToggleEl.onkeydown = null

        // disable tab navigation
        for (
          let i = 0, menuListLength = menuListEl.children.length;
          i < menuListLength;
          i++
        ) {
          const menuListItemEl = menuListEl.children[i]
          menuListItemEl.children[0].setAttribute('tabindex', -1)
        }
      }
    }
  }
}

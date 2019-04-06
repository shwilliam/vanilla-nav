{
  window.addEventListener('load', () => {
    const menuToggleEl = document.getElementById('menu-toggle')
    const menuEl = document.getElementById('menu')
    const menuListEl = document.getElementById('menu-list')
    const {
      length: l,
      [l - 1]: menuItemLastEl
    } = menuListEl.children

    const openMenu = () => {
      menuToggleEl.checked = true
      menuEl.setAttribute('aria-expanded', true)
      menuEl.setAttribute('aria-hidden', false)

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
    }

    const closeMenu = () => {
      menuToggleEl.checked = false
      menuEl.setAttribute('aria-expanded', false)
      menuEl.setAttribute('aria-hidden', true)

      // enable scroll
      window.onscroll = null

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

    // trap tab navigation within menu
    menuItemLastEl.addEventListener('keydown', (e) => {
      if (e.keyCode === 9 && !e.shiftKey) {
        menuToggleEl.focus()
        e.preventDefault()
      }
    })

    menuToggleEl.addEventListener('keydown', (e) => {
      if (e.keyCode === 9 && e.shiftKey) {
        // assumes focusable el is first child of menu list item
        menuItemLastEl.children[0].focus()
        e.preventDefault()
      }
    })

    menuToggleEl.addEventListener('click', ({ target }) => {
      const isOpening = target.checked

      if (isOpening) {
        openMenu()
      } else {
        closeMenu()
      }
    })

    menuEl.addEventListener('click', closeMenu)

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        closeMenu()
      }
    })
  })
}

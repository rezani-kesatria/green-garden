/**
 * GGIS motion layer — vanilla port of the approved React/GSAP mockup.
 *
 * Everything is keyed to `.ggis-*` classes assigned in the Divi builder
 * (Advanced → CSS ID & Classes). Elements without a class are untouched, so
 * the script is a safe no-op on pages that don't use the system.
 *
 * Motion voice (from DESIGN.md): two eases only — power4.out for reveals,
 * 'none' for scrubs. Reveals ≤ 1.2s, parallax ≤ 12%, exactly one pinned
 * section (Process).
 *
 * Accessibility: under prefers-reduced-motion we exit before ANY hidden
 * state is applied — the page renders fully static and fully visible.
 */
(function () {
  'use strict'

  function init() {
    // Divi Visual Builder: never fight the editor.
    if (document.body.classList.contains('et-fb')) return

    // Reduced motion (or missing libs): static page, native scroll.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText || !window.Lenis) return

    var gsap = window.gsap
    gsap.registerPlugin(window.ScrollTrigger, window.SplitText)
    gsap.defaults({ ease: 'power4.out', duration: 1 })
    var ScrollTrigger = window.ScrollTrigger
    var SplitText = window.SplitText

    /* -- Smooth scroll ----------------------------------------------------
       autoRaf (Lenis drives its own frame loop). Do NOT rewire this through
       gsap.ticker + lagSmoothing(0): that combination hard-froze Chrome's
       renderer during mockup verification. */
    var lenis = new window.Lenis({ autoRaf: true, duration: 1.15 })
    lenis.on('scroll', ScrollTrigger.update)

    // Same-page anchors glide through Lenis (offset clears the fixed header).
    document.querySelectorAll('a[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href') || ''
        var hash = href.slice(href.indexOf('#'))
        if (hash.length < 2) return
        var samePage =
          href.indexOf('#') === 0 ||
          href.split('#')[0] === window.location.pathname + window.location.search ||
          a.pathname === window.location.pathname
        if (!samePage || !document.querySelector(hash)) return
        e.preventDefault()
        lenis.scrollTo(hash, { offset: -88, duration: 1.4 })
      })
    })

    /* -- Helpers ----------------------------------------------------------- */

    // Masked line reveal. autoSplit waits for fonts and re-splits on resize;
    // returning the tween lets SplitText rebuild it safely each time.
    function revealLines(el, vars) {
      return SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true,
        onSplit: function (self) {
          return gsap.from(
            self.lines,
            Object.assign(
              { yPercent: 110, duration: 1.1, stagger: 0.09, ease: 'power4.out' },
              vars || {}
            )
          )
        },
      })
    }

    var each = function (sel, fn, root) {
      Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn)
    }

    /* -- Fixed header: solid chrome once the hero is left behind ----------- */
    var navbar = document.querySelector('.ggis-navbar')
    if (navbar) {
      ScrollTrigger.create({
        start: 120,
        end: 'max',
        onEnter: function () { navbar.classList.add('is-scrolled') },
        onLeaveBack: function () { navbar.classList.remove('is-scrolled') },
      })
      gsap.from(navbar, { yPercent: -100, duration: 0.8, delay: 0.9, ease: 'power3.out' })
    }

    /* -- Hero: the opening frame ------------------------------------------- */
    var hero = document.querySelector('.ggis-hero')
    if (hero) {
      var heroImgWrap = hero.querySelector('.ggis-hero-img')
      var heroImg =
        heroImgWrap && (heroImgWrap.tagName === 'IMG' ? heroImgWrap : heroImgWrap.querySelector('img'))

      if (heroImg) {
        gsap.set(heroImg, { scale: 1.14 })
        gsap.to(heroImg, { scale: 1, duration: 1.8 })
        gsap.to(heroImg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      }

      var heroHeadline = hero.querySelector('.ggis-hero-headline')
      if (heroHeadline) revealLines(heroHeadline, { delay: 0.35 })

      var heroFades = hero.querySelectorAll('.ggis-hero-fade')
      if (heroFades.length) {
        gsap.from(heroFades, { opacity: 0, y: 16, duration: 0.9, stagger: 0.12, delay: 0.9 })
      }

      var heroContent = hero.querySelector('.ggis-hero-content')
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -8,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }

    /* -- Display type: masked line reveals on scroll ------------------------ */
    each('.ggis-split', function (el) {
      revealLines(el, {
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
    })

    /* -- Manifesto ink scrub: words saturate as the reader scrolls ---------- */
    each('.ggis-ink-scrub', function (el) {
      SplitText.create(el, {
        type: 'words',
        autoSplit: true,
        onSplit: function (self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 75%', end: 'center 40%', scrub: 1 },
            }
          )
        },
      })
    })

    /* -- Generic fade-up reveals -------------------------------------------- */
    var reveals = gsap.utils.toArray('.ggis-reveal')
    if (reveals.length) {
      gsap.set(reveals, { opacity: 0, y: 28 })
      ScrollTrigger.batch(reveals, {
        start: 'top 82%',
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.09, overwrite: true })
        },
      })
    }

    /* -- Hairline rules draw in --------------------------------------------- */
    each('.ggis-rule', function (el) {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    /* -- Parallax figures: clip unmask + scrubbed drift ----------------------
       data-speed ≈ 0.92–1.08 (amplitude capped so edges never show);
       data-no-clip skips the unmask for figures that are the first frame. */
    each('.ggis-parallax', function (wrap) {
      var img = wrap.tagName === 'IMG' ? wrap : wrap.querySelector('img')
      if (!img) return
      var speed = parseFloat(wrap.getAttribute('data-speed') || '1')
      var amp = gsap.utils.clamp(-7, 7, (speed - 1) * 100)

      if (!wrap.hasAttribute('data-no-clip')) {
        gsap.set(wrap, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(img, { scale: 1.25 })
        gsap
          .timeline({ scrollTrigger: { trigger: wrap, start: 'top 88%', once: true } })
          .to(wrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' })
          .to(img, { scale: 1.14, duration: 1.5, ease: 'power3.out' }, '<')
      } else {
        gsap.set(img, { scale: 1.14 })
      }

      if (amp !== 0) {
        gsap.fromTo(
          img,
          { yPercent: -amp },
          {
            yPercent: amp,
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      }
    })

    /* -- Values marquee: infinite drift, tempo breathes with scroll --------- */
    each('.ggis-marquee', function (wrap) {
      var track = wrap.querySelector('.ggis-marquee-track')
      if (!track) return
      var duration = parseFloat(wrap.getAttribute('data-duration') || '46')
      var tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: duration, repeat: -1 })
      ScrollTrigger.create({
        onUpdate: function (self) {
          var boost = Math.abs(self.getVelocity()) / 1200
          gsap.to(tween, {
            timeScale: gsap.utils.clamp(0.6, 2.4, 0.8 + boost),
            duration: 0.5,
            overwrite: true,
          })
        },
      })
    })

    /* -- Process: the page's single pinned moment ---------------------------
       ≥1024px: pin the section and scrub the card track horizontally.
       Below that (or if the track fits), calm vertical batch reveals. */
    var process = document.querySelector('.ggis-process')
    if (process) {
      var track = process.querySelector('.ggis-process-track')
      var progress = process.querySelector('.ggis-process-progress')
      var counter = process.querySelector('.ggis-process-counter')
      var cards = track ? Array.prototype.slice.call(track.children) : []

      gsap.matchMedia().add(
        {
          desktop: '(min-width: 1024px)',
          mobile: '(max-width: 1023px)',
        },
        function (ctx) {
          if (!track || !cards.length) return

          var distance = function () {
            var left = track.getBoundingClientRect().left
            return Math.max(0, track.scrollWidth - window.innerWidth + left * 2)
          }

          if (ctx.conditions.desktop && distance() > 40) {
            var pad = function (n) { return (n < 10 ? '0' : '') + n }
            var tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: process,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                start: 'top top',
                end: function () { return '+=' + distance() },
                invalidateOnRefresh: true,
                onUpdate: function (self) {
                  if (!counter) return
                  var step = Math.min(cards.length, Math.round(self.progress * (cards.length - 1)) + 1)
                  counter.textContent = pad(step) + ' / ' + pad(cards.length)
                },
              },
            })
            tl.to(track, { x: function () { return -distance() } }, 0)
            if (progress) {
              tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center' }, 0)
            }
            var numerals = process.querySelectorAll('.ggis-process-numeral')
            if (numerals.length) tl.to(numerals, { xPercent: -14 }, 0)
          } else {
            gsap.set(cards, { opacity: 0, y: 32 })
            ScrollTrigger.batch(cards, {
              start: 'top 85%',
              once: true,
              onEnter: function (batch) {
                gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.12 })
              },
            })
          }
        }
      )
    }

    /* -- Magnetic CTAs (pointer-fine devices only) --------------------------- */
    gsap.matchMedia().add('(pointer: fine)', function () {
      each('.ggis-magnetic', function (el) {
        var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
        var onMove = function (e) {
          var r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3)
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
        }
        var onLeave = function () { xTo(0); yTo(0) }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return function () {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })
    })

    /* -- Footer ghost wordmark ----------------------------------------------- */
    each('.ggis-ghost', function (el) {
      var zone = el.closest('footer') || el.parentElement
      gsap.fromTo(
        el,
        { yPercent: 44 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: zone, start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      )
    })

    /* -- Late layout: remeasure once images land ----------------------------- */
    var refreshTimer = null
    var queueRefresh = function () {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(function () { ScrollTrigger.refresh() }, 200)
    }
    each('.ggis-parallax img', function (img) {
      if (!img.complete) img.addEventListener('load', queueRefresh)
    })
    window.addEventListener('load', function () { ScrollTrigger.refresh() })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

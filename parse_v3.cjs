const fs = require('fs');

const html = fs.readFileSync('v3_draft.html', 'utf-8');

// 1. Extract styles
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  let styles = styleMatch[1]
    .replace(/:root {/, ':root {\n  --color-primary: #e63946;\n  --color-bg-dark: #0a0a0c;\n  --color-bg-alt: #d4c4b0;\n  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);');
  
  fs.writeFileSync('src/v3.css', styles);
}

// 2. Extract body
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Remove script tags if any
bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');

// 3. Convert HTML to JSX
bodyContent = bodyContent.replace(/class="/g, 'className="');
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
bodyContent = bodyContent.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<br>/g, '<br />');
bodyContent = bodyContent.replace(/<hr>/g, '<hr />');
bodyContent = bodyContent.replace(/stroke-width="/g, 'strokeWidth="');
bodyContent = bodyContent.replace(/<line([^>]+[^\/])>/g, '<line$1 />');
// Fix <div id="root"> conflict with index.html root
bodyContent = bodyContent.replace(/id="root"/g, 'id="superdesign-root"');


// 4. Wrap in a React Component with the logic from the script block
const componentCode = `// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './v3.css';

gsap.registerPlugin(ScrollTrigger);

export default function SuperdesignV3() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };
    window.addEventListener('mousemove', onMouseMove);

    // Hero Stagger Animations
    const tl = gsap.timeline();
    tl.to('.hero-title span span', {
      y: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2
    }).to('.hero-stagger', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    }, "-=1");

    // Parallax Effects
    gsap.utils.toArray('.parallax-image').forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -100,
        ease: "none"
      });
    });

    // Scroll Reveals
    gsap.utils.toArray('.scroll-reveal, .scroll-reveal-step').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Timeline Path Drawing
    gsap.to(".timeline-path", {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: "#timeline",
        start: "top center",
        end: "bottom bottom",
        scrub: 2
      }
    });

    // Counter Animation
    const counters = gsap.utils.toArray('.counter');
    counters.forEach(counter => {
      ScrollTrigger.create({
        trigger: counter,
        onEnter: () => {
          let target = parseInt(counter.getAttribute('data-target'));
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power4.out"
          });
        }
      });
    });

    // Nav Scroll Interaction
    ScrollTrigger.create({
      start: "top -50",
      onUpdate: (self) => {
        const nav = document.getElementById('main-nav');
        if (nav) {
          if (self.direction === 1) {
            nav.style.backgroundColor = "rgba(0,0,0,0.85)";
            nav.style.paddingTop = "1rem";
            nav.style.paddingBottom = "1rem";
            nav.style.backdropFilter = "blur(10px)";
          } else {
            if (self.scroll() < 50) {
              nav.style.backgroundColor = "transparent";
              nav.style.paddingTop = "1.5rem";
              nav.style.paddingBottom = "1.5rem";
              nav.style.backdropFilter = "none";
            }
          }
        }
      }
    });

    // 3D Tilt Effect on Track Boxes
    const trackBoxes = gsap.utils.toArray('.track-box');
    trackBoxes.forEach(box => {
      const handleMove = (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / 20;
        const dy = (y - yc) / 20;
        box.style.transform = \`translateY(-10px) rotateX(\${-dy}deg) rotateY(\${dx}deg)\`;
      };
      const handleLeave = () => {
        box.style.transform = \`translateY(0) rotateX(0) rotateY(0)\`;
      };
      
      box.addEventListener('mousemove', handleMove);
      box.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, { scope: containerRef });

  useEffect(() => {
    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');

    const openMenu = () => {
      drawer?.classList.add('active');
      document.body.classList.add('mobile-menu-active');
    };
    
    const closeMenu = () => {
      drawer?.classList.remove('active');
      document.body.classList.remove('mobile-menu-active');
    };

    menuToggle?.addEventListener('click', openMenu);
    closeDrawer?.addEventListener('click', closeMenu);

    const links = drawer?.querySelectorAll('a');
    links?.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      menuToggle?.removeEventListener('click', openMenu);
      closeDrawer?.removeEventListener('click', closeMenu);
      links?.forEach(link => link.removeEventListener('click', closeMenu));
    };
  }, []);

  return (
    <div ref={containerRef} className="grain text-white bg-[#0a0a0c]">
      ${bodyContent}
    </div>
  );
}
`;

fs.writeFileSync('src/SuperdesignV3.tsx', componentCode);
console.log('Conversion complete with proper body extraction!');

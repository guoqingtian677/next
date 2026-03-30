"use client";

import { Application, Assets, Sprite, ResizePlugin } from 'pixi.js'
import Clouds from './Utility/clouds';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

export default function Page() {
    const [show, setShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let app:Application;
        const init = async () => {
            app = new Application()
            await app.init({
                width: window.innerWidth,
                height: window.innerHeight,
                background: 0x6d6d6d,
                resolution: window.devicePixelRatio || 1,
                autoDensity: true,
            });
            app.resize();
            window.onresize = () => {
                app.resize();
            };
            document.body.appendChild(app.canvas);
            const skyBg = await Assets.load("/assets/skyBG.jpg")
            await Assets.load({
                alias: 'skyCloud1', src: '/assets/skyCloud1.png'
            })
            await Assets.load({
                alias: 'skyCloud2', src: '/assets/skyCloud2.png'
            })
            const bg = new Sprite(skyBg)
            bg.setSize(app.screen.width, app.screen.height)
            app.stage.addChild(bg)
            let clodus = new Clouds()
            clodus.view.position.set(0, 500)
            app.stage.addChild(clodus.view)
            app.ticker.add(() => {
                clodus.updated()
            })
            setShow(true);
        }
        init();
        return () => {
            try {
                if (app) {
                    app.destroy(true, { children: true });
                }
                window.onresize = null;
            } catch (error) {
                console.log(error)
            }
        }
    }, [])
    
    useEffect(() => {
        if (!show) return;
        const split = SplitText.create(".animate-me", { type: "chars" });
        const ss = SplitText.create(".animate-go", { type: "chars" });
       const tl = gsap.timeline();
       tl.set(ss.chars, {
            opacity: 0,
       })
        tl.from(split.chars, {
            opacity: 0,
            duration: 0.5,
            ease: "sine.out",
            stagger: 0.1,
        })
        split.chars.forEach((char, index) => {
            tl.to(char, {
                y: -200,
                rotationX: 360,
                duration: 0.2, 
                ease: "ease.out", 
                delay: 0.1,
            })
        });
        tl.to(ss.chars, {
            opacity: 1,
            duration: 2,
            ease: "sine.out",
            stagger: 0.1,
        })
        
    }, [show])

    function handleClick() {
        router.push('/login')
    }
    if (!show) {
        // 局中显示 loading, 使用gsap 实现一个简单的动画效果, ... 上下动画
        return <div className='fixed z-50 text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> loading ... </div>;
    }

    return(
        <div>
            <div className='animate-me fixed z-50 text-white text-9xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> welcome </div>
            <svg className='fixed'>
                <defs>
                    <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1">
                        </feTurbulence>
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear">
                            </animate>
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1">
                        </feTurbulence>
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear">
                            </animate>
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2">
                        </feTurbulence>
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear">
                            </animate>
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2">
                        </feTurbulence>
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -300" dur="6s" repeatCount="indefinite" calcMode="linear">
                            </animate>
                        </feOffset>
                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1"></feComposite>
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2"></feComposite>
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise"></feBlend>
                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R"
                            yChannelSelector="B"></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div
                className='animate-go fixed z-50 text-blue-700  text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                style={{ filter: 'url(#turbulent-displace)' }}
                onClick={handleClick}
            >
                Home Page
            </div>
        </div>
    );
}
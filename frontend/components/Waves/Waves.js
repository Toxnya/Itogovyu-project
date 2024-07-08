import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Waves = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        camera.position.set(0, -24, 75);
        camera.lookAt(0, -10, 10);

        const circles = new THREE.Scene();
        const distanceFromCenter = 150;
        const spacing = 2.45;
        const circleGeometry = new THREE.CircleGeometry(1, 32);
        const baseColor = 0xaaaaaa;

        for (let i = -distanceFromCenter; i <= distanceFromCenter; i += spacing) {
            for (let j = -distanceFromCenter; j <= distanceFromCenter; j += spacing) {

                const circleMaterial = new THREE.MeshBasicMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.01
                });

                const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
                circleMesh.position.set(i, -50, j);
                circleMesh.scale.set(0.2, 0.2, 0.2);

                circles.add(circleMesh);
            }
        }
        scene.add(circles);

        const animateWaves = () => {
            const time = Date.now() * 0.001;
            circles.children.forEach((circle, index) => {
                const x = circle.position.x;
                const z = circle.position.z;
                const distance = Math.sqrt(x * x + z * z);
                const angle = Math.atan2(z, x);
                const yOffset = Math.sin(distance * 0.1 + time) * Math.cos(angle * 4 + time) * 2;
                circle.position.y = yOffset - 60;

                const distanceToCamera = circle.position.distanceTo(camera.position);
                circle.material.opacity = Math.max( Math.min(0.5, 0.9 - distanceToCamera / 150));
            });
        };

        const animate = () => {
            requestAnimationFrame(animate);
            animateWaves();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mount.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} className="waves-container" style={{ height: '100vh' }} />;
};

export default Waves;
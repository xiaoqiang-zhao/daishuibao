<template>
    <div class="wave"></div>
</template>

<script>
/**
 * @file 登录
 *
 * @author zxq
 */
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event';

const THREE = require('three');
const AMOUNT = 50;
const SEPARATION = 90;

export default {
    components: {},
    data() {
        return {
            screenWidth: 0,
            screenHeight: 0,
            mouseX: 0,
            mouseY: 0,
            count: 0
        };
    },
    created() {},
    mounted() {
        this.setScreenSize();
        this.init();
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this.setScreenSize);
        document.addEventListener('mousemove', this.handleMouseMove);
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
    methods: {
        init() {
            const aspectRatio = this.screenWidth / this.screenHeight;
            this.camera = new THREE.PerspectiveCamera(
                75,
                aspectRatio,
                1,
                10000
            );
            this.camera.position.z = 1000;
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({ alpha: true });
            this.renderer.setSize(this.screenWidth, this.screenHeight);
            const geometry = new THREE.CircleGeometry(1, 32);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(this.color),
            });
            let i = 0;
            let particle = null;
            this.particles = [];
            for (let ix = 0; ix < AMOUNT; ix++) {
                for (let iy = 0; iy < AMOUNT; iy++) {
                    particle = this.particles[i++] = new THREE.Mesh(
                        geometry,
                        material
                    );
                    particle.position.x =
                        ix * SEPARATION - (AMOUNT * SEPARATION) / 2;
                    particle.position.z =
                        iy * SEPARATION - (AMOUNT * SEPARATION) / 2;
                    this.scene.add(particle);
                }
            }
            this.$el.appendChild(this.renderer.domElement);
            document.addEventListener('mousemove', this.handleMouseMove);
            // on(document, "mousemove", this.handleMouseMove);
            addResizeListener(this.$el, this.setScreenSize);
            this.interval = setInterval(this.loop, 1000 / 60);
        },
        loop() {
            const { scene, camera, renderer, mouseX, mouseY, count } = this;
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.position.y = 364;
            let i = 0;
            let particle = null;
            for (let ix = 0; ix < AMOUNT; ix++) {
                for (let iy = 0; iy < AMOUNT; iy++) {
                    particle = this.particles[i++];
                    particle.position.y =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;
                    particle.scale.x = particle.scale.y =
                        (Math.sin((ix + count) * 0.3) + 1) * 2 +
                        (Math.sin((iy + count) * 0.5) + 1) * 2;
                }
            }
            renderer.render(scene, this.camera);
            this.count += 0.1;
        },
        setScreenSize() {
            const rect = this.$el.getBoundingClientRect();
            this.screenWidth = rect.width;
            this.screenHeight = rect.height;
            this.renderer &&
                this.renderer.setSize(this.screenWidth, this.screenHeight);
        },
        handleMouseMove(e) {
            this.mouseX = e.clientX - this.screenWidth / 2;
            this.mouseY = e.clientY - this.screenHeight / 2;
        }
    }
};
</script>

<style lang="less" scoped>
.wave {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
</style>

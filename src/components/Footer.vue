<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <footer class="footer">
        <div class="wrapper">
            <div class="upper-footer-section">
                <div class="footer-content-logo">
                    <RouterLink to="/">
                        <span>BP</span>
                    </RouterLink>
                </div>

                <nav class="footer-content-nav">
                    <RouterLink to="/work">WORK</RouterLink>
                    <RouterLink to="/about">ABOUT</RouterLink>
                    <a href="mailto:bernard@weeklyhow.com">CONTACT</a>
                </nav>

                <div class="footer-content-quote">
                    <p>“The only way to do great work is to love what you do.”</p>
                    <span>- Steve Jobs</span>
                </div>

                <nav class="footer-content-social">
                    <a href="https://www.linkedin.com/in/polidario/" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-linkedin"></v-icon>
                    </a>
                    <a href="https://youtube.com/@weeklyhow" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-youtube"></v-icon>
                    </a>
                    <a href="https://instagram.com/weeklyhow" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-instagram"></v-icon>
                    </a>
                </nav>

            </div>
            <div class="lower-footer-section">
                <div class="footer-content-text">
                    <p>© 2025 BP.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    width: 100%;
    height: 50vh;
    padding: var(--space-13);
    background-color: var(--color-white);
    overflow: hidden;
    position: relative;

    .wrapper {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        gap: var(--space-8);

        z-index: 1;

        .upper-footer-section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: start;
            gap: var(--space-6);

            .footer-content-logo, .footer-content-social {
                flex-basis: 25%;
            }

            .footer-content-nav {
                flex-basis: 25%;

                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }

            .footer-content-quote {
                flex-basis: 25%;

                p {
                    font-size: var(--text-h4);
                    font-weight: var(--font-weight-bold);
                }
            }

            .footer-content-social {
                display: flex;
                gap: var(--space-4);
                align-items: center;
                justify-content: end;
            }
        }

        .lower-footer-section {
            .footer-content-text {
                p {
                    color: var(--color-gray);
                    text-align: center;
                    font-weight: var(--font-weight-bold);

                    transition: color 1s ease-in-out;
                }
            }
            
        }
    }
}

footer::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: block;
    width: 100vw;
    height: 40vh;
    background: linear-gradient(to bottom, rgb(18, 18, 18), rgba(26, 12, 49, 1));
    border-radius: 0 0 30% 30%;

    transition: border-radius 1s ease-in-out, height 1s ease-in-out, bottom 1s ease-in-out;
}

@media (max-width: 992px) {
    footer {
        padding: var(--space-8) var(--space-4);
        height: 100vh;

        .wrapper {
            .upper-footer-section {
                flex-direction: column;
                gap: var(--space-4);

                .footer-content-logo, .footer-content-social {
                    flex-basis: 100%;
                }

                .footer-content-nav {
                    flex-basis: 100%;
                }

                .footer-content-quote {
                    flex-basis: 100%;

                    display: none;

                    p {
                        font-size: var(--text-h5);
                    }
                }

                .footer-content-social {
                    justify-content: center;
                }
            }

            .lower-footer-section {
                color: var(--color-white);
                display: flex;
                justify-content: center;
            }
        }
    }

    footer::after {
        border-radius: 0;
    }
}

@media (max-width: 1200px) {
    footer::after {
        height: 80vh;
        top: 0;
        border-radius: 0;
    }
}

@media (min-width: 992px) and (max-width: 1200px) {
    footer {
        height: 80vh;

        .upper-footer-section {
            .footer-content-quote {
                p {
                    font-size: var(--text-h5);
                }
            }
        }
        .lower-footer-section {
            .footer-content-text {
                p {
                    color: var(--color-white) !important;
                }
            }
        }
    }
}
</style>
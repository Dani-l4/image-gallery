<script setup lang="ts">
import { ref, onUpdated, onMounted } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { iImage, iPBResponse } from './types'

const ApiClient = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: '43814244-dcce4ea23cf1a6f16a9383d0f',
        q: 'yellow+flowers',
        image_type: 'photo',
    },
})

let photos = ref<iImage[]>()

ApiClient.get('').then((res: AxiosResponse<iPBResponse>) => {
    photos.value = res.data.hits.slice(0, 20)
    return res
})

onUpdated(() => {
    document.querySelectorAll('.photo').forEach((img) => {
        img.addEventListener('click', () => {
            document.body.classList.add('lock')
            document.querySelector('.pop_up')?.classList.add('open')
            const popUpPhoto: HTMLImageElement = document.querySelector(
                '.pop_up img'
            ) as HTMLImageElement
            const newUrl = String(img.getAttribute('data-webformatURL'))

            popUpPhoto.src = newUrl
        })
    })
})

function closePopUp(e: Event) {
    const target = e!.target as HTMLElement
    if (
        target.classList?.contains('pop_up') ||
        target.classList?.contains('close')
    ) {
        document.body.classList.remove('lock')
        document.querySelector('.pop_up')?.classList.remove('open')
        const popUpPhoto: HTMLImageElement = document.querySelector(
            '.pop_up img'
        ) as HTMLImageElement
        popUpPhoto.src = ''
    }
}

onMounted(() => {
    document
        .querySelector('.pop_up')
        ?.addEventListener('click', (e) => closePopUp(e))
})
</script>

<template>
    <div v-if="photos">
        <h1>Image gallery</h1>
        <div class="gallery">
            <div
                v-for="photo in photos"
                :key="photo.id"
                class="gallery__item item"
                @click="photo.id;"
            >
                <div :href="photo.previewURL" class="item__photo">
                    <img
                        :src="photo.previewURL"
                        alt="photo"
                        class="photo"
                        :data-webformatURL="photo.webformatURL"
                    />
                </div>
                <div class="item__stats stats">
                    <span class="stats__likes">{{ photo.likes }}</span>
                    <span class="stats__views">{{ photo.views }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="pop_up">
        <img src="" alt="big_img" />
        <span class="close">&times;</span>
    </div>
</template>

<style scoped>
h1 {
    margin-top: 0;
}
.item {
    cursor: pointer;
    min-height: 200px;
    display: flex;
    flex-direction: column;
}
.item__photo {
    position: relative;
    height: 90%;
    overflow: hidden;
}
.item__photo > img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    transition: 0.3s;
}
.item__photo > img:hover {
    transform: scale(1.1);
}

.pop_up {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    transition: 0.4s;
}
.pop_up img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    height: auto;
}
.pop_up span {
    position: absolute;
    top: 40px;
    right: 40px;
    height: 40px;
    width: 40px;
    line-height: 30px;
    border-radius: 50%;
    background-color: #fff;
    font-size: 44px;
    font-weight: bold;
    text-align: center;
    color: black;
    cursor: pointer;
}
.pop_up.open {
    top: 0;
}
.stats {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: auto;
}
.stats span {
    position: relative;
}
.stats__likes:before {
    content: '';
    background-image: url('../public/like-svgrepo-com.svg');
    width: 20px;
    height: 20px;
    position: absolute;
    left: -22px;
    top: 13%;
}
.stats__views:before {
    content: '';
    background-image: url('../public/view-eye-svgrepo-com.svg');
    width: 20px;
    height: 20px;
    position: absolute;
    background-repeat: no-repeat;
    left: -22px;
    top: 13%;
}
.gallery {
    flex-grow: 1;
    display: grid;
    gap: 15px;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>

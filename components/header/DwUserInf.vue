<template>
  <div class="flex align-items-center ">
    <div class="notify pointer right-margin">
      <dw-notify/>
      <span v-if="notifyCount">{{notifyCount}}</span>
    </div>
    <div class="image-wrapper">
      <img class="pointer" width="48px" height="48px" :src="avatar" alt="">
      <ul class="profile-menu">
        <li><nuxt-link>Моя страница</nuxt-link></li>
        <li><nuxt-link>Сообщения</nuxt-link></li>
        <li><nuxt-link>Мои проекты</nuxt-link></li>
        <li><nuxt-link>Настройки</nuxt-link></li>
        <li><nuxt-link>Выйти</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DwNotify from '~/assets/svg/user/notify.svg?inline';
  import DwAvatar from '~/assets/svg/user/user.svg?raw';

  export default {
    components: {
      DwNotify, DwAvatar
    },
    async mounted() {
      this.notifyCount = await this.$store
        .getters['notification/notifyCount'];
    },
    data() {
      return {
        avatar: DwAvatar,
        notifyCount: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
 div {
   .image-wrapper {
     img {
       vertical-align: bottom;
       border-radius: 12px;
       transition: background-color 200ms;
       &:hover {
         background: var(--blue);
       }
       &:active {
         background: var(--light-blue);
       }
     }
   }
   .logo {
     margin: 2rem 1.5rem;
   }

   .plus {
     display: inline-block;
     max-height: 1rem;
     vertical-align: middle;
     font-size: 1rem;
     font-weight: 600;
   }

   .notify {
     svg {
       stroke: #3F4C67;
       &:hover {
         stroke: var(--blue);
       }
       &:active {
         stroke: var(--light-blue);
       }
     }
     position: relative;

     span {
       position: absolute;
       right: -3px;
       top: 0;
       font-weight: 600;
       color: var(--white);
       max-width: 1rem;
       width: 1rem;
       max-height: 0.6rem;
       height: 0.6rem;
       font-size: 0.6rem;
       line-height: 0.5rem;
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: var(--light-red);
       border-radius: 1rem;
     }
   }
 }
</style>

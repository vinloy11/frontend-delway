<template>
  <div class="flex align-items-center ">
    <a @click.prevent="" href class="notify pointer right-margin">
      <dw-notify/>
      <span v-if="notifyCount">{{notifyCount}}</span>
    </a>
    <a ref="menu" @click.prevent="hidden = !hidden" href=""
       :class="['image-wrapper','pointer', hidden ? '' : 'active']">
      <img ref="avatar"  width="48px"
           height="48px" :src="avatar" alt="">
      <nav>
        <ul class="profile-menu" v-if="!hidden">
          <li>
            <nuxt-link class="link" to="/">
              <dw-user/>
              {{ words.myPage }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="link" to="/messages">
              <dw-messages/>
              {{ words.messages }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="link" to="/projects/my">
              <dw-projects/>
              {{ words.myProjects }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="link" to="/settings">
              <dw-settings/>
              {{ words.settings }}
            </nuxt-link>
          </li>
          <li>
            <a @click.prevent="logout" href="" :to="link" class="link" >
              <dw-logout/>
              {{ words.logout }}
            </a>
          </li>
        </ul>
      </nav>
    </a>
  </div>
</template>

<script>
  import DwNotify from '~/assets/svg/user/notify.svg?inline';
  import DwAvatar from '~/assets/svg/user/avatar.svg?raw';
  import DwUser from '~/assets/svg/user/user.svg?inline';
  import DwLogout from '~/assets/svg/user/logout.svg?inline';
  import DwMessages from '~/assets/svg/user/mail.svg?inline';
  import DwProjects from '~/assets/svg/user/projects.svg?inline';
  import DwSettings from '~/assets/svg/user/settings.svg?inline';


  export default {
    components: {
      DwNotify, DwAvatar, DwLogout, DwMessages, DwProjects, DwSettings, DwUser
    },
    async mounted() {
      const that = this;
      document.documentElement.addEventListener('click', that.hideMenu);
      this.notifyCount = await this.$store
        .getters['notification/notifyCount'];
    },
    data() {
      return {
        hidden: true,
        avatar: DwAvatar,
        notifyCount: 0
      }
    },
    computed: {
      words() {
        return this.$store.getters['translate/words']
      },
      link() {
        return {
          path: this.$route.path,
          params: this.$route.params
        }
      }
    },
    methods: {
      hideMenu(e) {
        if (e.target === this.$refs.avatar || e.target === this.$refs.menu) return;
        return this.hidden = true
      },
      async logout() {
        await this.$store.dispatch('authUser/logout');
        this.$router.go()
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    .image-wrapper {
      position: relative;
      box-sizing: border-box;
      &:focus, &:hover {
        img {
          background: var(--light-blue);
        }
      }
      &:active, &.active {
        img {
          background: var(--blue);
        }
      }
      img {
        vertical-align: bottom;
        border-radius: 12px;
        transition: background-color 200ms;
      }

      .profile-menu {
        margin-top: 0.5rem;
        background-color: var(--dark-blue);
        white-space: nowrap;
        font-weight: 600;
        position: absolute;
        right: -1rem;

        &:before {
          content: '';
          position: absolute;
          background-color: var(--dark-blue);
          width: 0.8rem;
          height: 0.8rem;
          top: -0.1rem;
          transform: rotate(45deg);
          right: 2rem;
        }

        li {
          display: block;
          padding: 0.8rem 0.8rem 0.2rem 0.8rem;

          &:last-child {
            padding-bottom: 0.8rem;
          }

          a {
            display: flex;
            align-items: center;

            svg {
              stroke: var(--white);
              margin-right: 0.5rem;
            }

            color: var(--white);

            &:hover, &:focus {
              svg {
                stroke: var(--light-blue);
              }
              color: var(--light-blue);
            }

            &:active {
              svg {
                stroke: var(--blue);
              }

              color: var(--blue);
            }
          }
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

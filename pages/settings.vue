<template>
  <section class="settings grid">
    <div class="grid-row">
      <aside data-column="3" class="side-bar">
        <span class="title">{{ words.account }}</span>
        <ul class="top-margin-s">
          <li>
            <a @click.prevent="activeTab = tabs.profile"
               href=""
               :class="['tab', activeTab.page === 'Profile' ? 'active' : '']">
              <dw-user/>
              {{ words.profile }}
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = tabs.account" href=""
               :class="['tab', activeTab.page === 'Account' ? 'active' : '']">
              <dw-account/>
              {{ words.credentials }}
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = tabs.notifications" href=""
               :class="['tab', activeTab.page === 'Notifications' ? 'active' : '']">
              <dw-notifications/>
              {{ words.notifications }}
            </a>
          </li>
        </ul>
      </aside>
      <div data-column="9" class="content">
        <div class="title">{{ activeTab.title }}</div>
        <div class="grid">
          <div class="grid-row">
            <div data-column="1"></div>
            <section data-column="10" class="user top-margin flex">
              <div>
                <!--                <h1>ПРИВЕТ как еелажа</h1>-->
                <img ref="avatar" width="64px"
                     height="64px" :src="avatar" alt="">
              </div>
              <div class="left-margin flex column space-around bold">
                <span class="block  black">{{ `${user.name} ${user.lastName}` }}</span>
                <form ref="imageForm" action="http://localhost:3000/" method="post">
                  <input @change="changeFile" ref="uploadFile" hidden type="file">
                  <label for=""></label>
                  <a v-dw-active="" class="block link text-small" @click.prevent="changePhoto" href="">
                    {{ words.changePhoto }}</a>
                </form>
              </div>
              <!--            {{ user }}-->
            </section>
            <div data-column="1"></div>
          </div>
        </div>
        <component :user="user" :is="activeTabHandler"/>
      </div>
    </div>
  </section>
</template>

<script>
  import DwSettings from '~/assets/svg/user/settings.svg?inline';
  import DwAvatar from '~/assets/svg/user/avatar.svg?raw';
  import DwUser from '~/assets/svg/user/user.svg?inline';
  import DwAccount from '~/assets/svg/settings/account.svg?inline';
  import DwNotifications from '~/assets/svg/settings/notifications.svg?inline';

  export default {
    middleware: ['user-auth'],
    components: { DwSettings, DwAvatar, DwUser, DwAccount, DwNotifications },
    async fetch({ store, app }) {
      await store.dispatch('translate/translatePage');
      await store.dispatch('translate/fetchLanguage');
      await store.dispatch('user/fetchUser');
    },
    created() {
      // this.$store.commit('translate/setLanguage')
      if (this.$route.query.tab) {
        if (!this.tabs[this.$route.query.tab]) return;
        this.activeTab = this.tabs[this.$route.query.tab]
      }
      this.Account = () => import(`~/components/settings/Account.vue`);
      this.Notifications = () => import(`~/components/settings/Notifications.vue`);
      this.Profile = () => import(`~/components/settings/Profile.vue`);
    },
    data() {
      return {
        Account: null,
        Notifications: null,
        Profile: null,
        avatar: DwAvatar,
        newImage: '',
        activeTab: { page: 'Profile', title: this.getWords().profile },
      }
    },
    watch: {
      activeTab() {
        const newTab = this.activeTab.page.toLowerCase();
        history.pushState(null, null, `/settings?tab=${ newTab }`);
      }
    },
    methods: {
      changePhoto() {
        this.$refs.uploadFile.click();
        console.log('kek')
      },
      changeFile(e) {
        if (!e.target.files[0]) return;
        this.newImage = e.target.files[0];
        const fr = new FileReader();
        fr.addEventListener("load", () => this.showImage(fr));
        fr.readAsDataURL(e.target.files[0]);
      },
      async showImage(fr)  {
        const formData = new FormData();
        formData.append('file', this.file);
        try {
          await this.$axios.post('/uploadFileUrl',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          this.$refs.avatar.src = fr.result;
        } catch (e) {
          console.error(e);
        }
      },
      getWords() {
        return this.$store.getters['translate/words']
      }
    },
    computed: {
      tabs() {
        return {
          profile: {
            title: this.words.profile,
            page: 'Profile'
          },
          account: {
            title: this.words.credentials,
            page: 'Account'
          },
          notifications: {
            title: this.words.profile,
            page: 'Notifications'
          }
        }
      },
      words() {
        return this.$store.getters['translate/words']
      },
      user() {
        return this.$store.getters['user/user']
      },
      activeTabHandler() {
        return this[this.activeTab.page]
      }
    }

  }
</script>

<style lang="scss" scoped>

  .settings {
    .side-bar {
      background: var(--white);
      width: 100%;
      font-weight: 600;
      align-self: start;
      padding-bottom: 0.5rem;

      .title {
        display: block;
        padding: 12px 0 12px 8px;
        border-bottom: 2px solid #ECEFF7;
      }

      .tab {
        background-color: var(--white);
        border: none;
        border-left: 4px solid transparent;
        display: flex;
        width: 100%;
        align-items: center;
        cursor: pointer;
        padding: 8px;
        font-weight: 600;
        color: var(--black);
        outline: none;

        svg {
          height: 1.5em;
          width: 1.5em;
          stroke: var(--dark-blue);
          margin-right: 1.5rem;
        }

        li {
          display: flex;
          align-items: center;
        }

        &:not(.active):hover, &:not(.active):focus {
          border-left-color: var(--blue);
          color: var(--blue);
          background-color: #ECEFF7;
          opacity: 0.5;
        }

        &.active, &:active {
          border-left-color: var(--dark-blue);
          color: var(--dark-blue);
          background-color: #ECEFF7;
        }
      }
    }

    .content {
      background: var(--white);
      width: 100%;
      height: 70vh;

      .title {
        font-weight: 600;
        padding: 12px 0 12px 8px;
        border-bottom: 2px solid #ECEFF7;
      }

      .user {
        padding-bottom: 18px;
        border-bottom: 1px solid #ECEFF7;

        img {
          border-radius: 50%;
        }

        .link {
          color: #2D9CDB;
          transform: scale(1);

          &:hover, &:focus {
            color: var(--blue);
          }

          &:active, &.active {
            transform: scale(0.98);
            color: var(--light-blue);
          }
        }
      }
    }
  }
</style>

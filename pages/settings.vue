<template>
  <section class="settings grid">
    <div class="grid-row">
      <aside data-column="3" class="side-bar">
        <span class="title">Аккаунт</span>
        <ul class="top-margin-s">
          <li>
            <a @click.prevent="activeTab = 'Profile'" href=""
               :class="['tab', activeTab === 'Profile' ? 'active' : '']">
              <dw-settings/>
              Профиль
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = 'Account'" href=""
               :class="['tab', activeTab === 'Account' ? 'active' : '']">
              <dw-settings/>
              Учетные данные
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = 'Notifications'" href=""
               :class="['tab', activeTab === 'Notifications' ? 'active' : '']">
              <dw-settings/>
              Уведомления
            </a>
          </li>
        </ul>
      </aside>
      <div data-column="9" class="content">
        <component :is="activeTabHandler">
          <section class="user">

          </section>
        </component>
      </div>
    </div>
  </section>
</template>

<script>
  import DwSettings from '~/assets/svg/user/settings.svg?inline';

  export default {
    middleware: ['user-auth'],
    components: { DwSettings },
    async fetch({store}) {
      await store.dispatch('user/fetchUser');
    },
    mounted() {
      this.Account = () => import(`~/components/settings/Account.vue`);
      this.Notifications = () => import(`~/components/settings/Notifications.vue`);
      this.Profile = () => import(`~/components/settings/Profile.vue`);
    },
    data() {
      return {
        Account: null,
        Notifications: null,
        Profile: null,
        activeTab: 'Profile',
      }
    },
    computed: {
      user() {
        return this.$store.getters['user/user']
      },
      activeTabHandler() {
        return this[this.activeTab]
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
        font-size: 14px;
        font-weight: 600;
        color: var(--black);
        outline: none;

        svg {
          height: 24px;
          width: 24px;
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
    }
  }
</style>

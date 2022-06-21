<script>
  import { query, mutation } from 'svelte-apollo';
  import { GET_USERS, UPDATE_USER_ROLE } from '/imports/ui/apollo/query';
  import { auth } from '/imports/ui/stores';
  import { ADMIN, USER } from '/imports/utils/constans';
  import { router } from 'tinro/cmp/index.js';

  const users = query(GET_USERS);
  const updateUserRole = mutation(UPDATE_USER_ROLE);

  const verifyChecked = (role) => {
    if(role === ADMIN) {
      return true;
    }
    return false;
  }

  const verifyUser = (userId) => {
    if($auth._id === userId) {
      return true;
    }
    return false;
  }

  const onRoleUpdate = async (_id, role) => {
    let newRole;

    if(role === ADMIN) {
      newRole = USER;
    }
    else{
      newRole = ADMIN;
    }

    const userValues = {
      _id: _id,
      role: newRole,
    }

    try {
      await updateUserRole({variables: userValues});
      await users.refetch();
    }
    catch(error) {
      console.log(error)
    }
  }

  const goHome = () => router.goto('/');

</script>
<!-- user list start-->
<div class="row d-flex justify-content-center align-items-center content-auth">
  <div class="auth-box">
    <div class="card auth">
      <div class="card-header">
        <h4>유저관리</h4>
      </div>
      <div class="card-body">
        <table class="table user-table ">
          <thead>
            <tr>
              <td>이메일</td>
              <td class="text-center">관리권한</td>
              <td class="text-center">관리수정</td>
            </tr>
          </thead>
          <tbody>
            {#if $users.loading}
              <tr>
                <td colspan="3">
                  <p>Loading...</p>
                </td>
              </tr>
            {:else if  $users.error}
              <tr>
                <td colspan="3">
                  <p>오류가 발생했습니다. 페이지를 새로고침 해주세요.</p>
                </td>
              </tr>               
            {:else}
              {#each $users.data.users as user (user._id)}
                <tr>
                  <td>{user.emails[0].address}</td>
                  <td class="text-center">{user.profile.role}</td>
                  <td class="text-center">
                    <input type="checkbox" 
                      disabled={verifyUser(user._id)}
                      checked={verifyChecked(user.profile.role)} 
                      on:click={() => onRoleUpdate(user._id, user.profile.role)} />
                  </td>
                </tr>                
              {/each}
            {/if}          
          </tbody>
        </table>
      </div>
      <div class="card-bottom d-flex flex-column">
        <button class="btn btn-primary pt-3 pb-3 mb-3" on:click={goHome}>확인</button>
      </div>
    </div>
  </div>
</div>
<!-- user list end -->
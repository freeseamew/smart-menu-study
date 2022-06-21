<script>
  import { mutation } from 'svelte-apollo';
  import { ADD_USER } from '/imports/ui/apollo/query';
  import { router } from 'tinro/cmp/index';
  import { extractErrors, registerValidateSchema } from '/imports/utils/validates';

  const addUser = mutation(ADD_USER);

  let formValues = {
    email: '',
    pwd: '',
    pwdConfirm: ''
  }

  let errors = {};

  const onSubmitRegister = async () => {
    try {
      await registerValidateSchema.validate(formValues, {abortEarly: false});
      onRegister();
      errors = {};
    }
    catch(error) {
      errors = extractErrors(error);
    }
  }

  const onRegister = async () => {
    try {
      await addUser({variables: formValues});
      alert('회원 가입이 완료되었습니다. 로그인 해주세요.');
      router.goto('/login');
    }
    catch(error) {
      console.assert(error);
    }
  }
</script>

<!-- register from start-->
<div class="row d-flex justify-content-center align-items-center content-auth">
  <div class="auth-box">
    <div class="card auth">
      <div class="card-header">
        <h4>회원가입</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="idTextInput" class="form-label">아이디</label>
          <input type="text" class="form-control" bind:value={formValues.email} class:inputError={errors.email}> 
          {#if errors.email}
            <span class="invalid-feedback was-validated">{errors.email}</span>
          {/if}          
        </div>
        <div class="mb-3">
          <label for="pwdTextInput" class="form-label">패스워드</label>
          <input type="password" class="form-control" bind:value={formValues.pwd} class:inputError={errors.pwd}> 
          {#if errors.pwd}
            <span class="invalid-feedback was-validated">{errors.pwd}</span>
          {/if}          
        </div>            
        <div class="mb-3">
          <label for="pwdTextInputAgain" class="form-label">패스워드 확인</label>
          <input type="password" class="form-control" bind:value={formValues.pwdConfirm} class:inputError={errors.pwdConfirm}> 
          {#if errors.pwdConfirm}
            <span class="invalid-feedback was-validated">{errors.pwdConfirm}</span>
          {/if}          
        </div>                        
      </div>
      <div class="card-bottom d-flex flex-column">
        <button class="btn btn-primary pt-3 pb-3 mb-3" on:click={onSubmitRegister}>가입하기</button>
        <p class="align-self-end">이미 회원가입되어 있습니다. <span><a href="/login">[로그인]</a></span></p>
      </div>
    </div>
  </div>
</div>
<!-- register from end-->
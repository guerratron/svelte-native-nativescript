<script lang="ts">
  import { navigate } from "svelte-native";
  import localStorage from "@nativescript-use/nativescript-localstorage";
  import Menu from "./Menu.svelte";

  let username = "";
  let password = "";
  let showPassword = false;
  let loginError = "";
  let emailError = "";
  let isAuthenticating = false;
  let hasPasswordErrors = false;
  let isSubmitEnabled = true;

  function login() {
    if (username) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: username,
          fullName: "John Smith",
          mail: "john.smith@example.com",
        }),
      );
      //goto("home");
      navigate({ page: Menu });
    }
  }
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  const forgotPassword = () => {};

  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(username)) {
      emailError = "Invalid email format.";
    } else {
      emailError = "";
    }
  }
</script>

<page>
  <scrollView width="100%" height="100%">
    <stackLayout width="100%" height="100%">
      <gridLayout rows="33*, 67*">
        <gridLayout row="0" >
            <image src="~/assets/logo@3x.png" style="width: 200px;height:100px;"></image>
        </gridLayout>

        <gridLayout row="1" rows="*, auto" style="padding:50px;">
          {#if isAuthenticating}
            <gridLayout row="0">
              <activityIndicator
                busy={isAuthenticating}
                color="white"
                horizontalAlignment="center"
                verticalAlignment="middle"
              />
            </gridLayout>
          {/if}

          <gridLayout row="0" rows="*">
            <gridLayout
              row="0"
              rows="auto, auto, auto, auto"
              verticalAlignment="top"
            >
              <flexboxLayout row="0" flexDirection="column" >
                <label
                style="background:yellow;margin:0px"
                  row="0"
                  text="Email"
                ></label>
                <textField
                  row="1"
                  style="background:green;marging:0px;width:50%"
                  hint="E.g. user@examples.com"
                  keyboardType="email"
                  bind:text={username}
                  autocorrect="false"
                  autocapitalizationType="none"
                />
                {#if emailError}
                  <label
                    row="2"
                    >{emailError}</label
                  >
                {/if}
              </flexboxLayout>

              <gridLayout row="1" rows="auto, auto, auto">
                <label
                  text="Password"
                  row="0"
                ></label>

                <gridLayout
                  row="1"
                  columns="*, auto"
                >
                  <textField
                    hint="Password"
                    bind:text={password}
                    secure={!showPassword}
                  />
                  <label column="1"
                    text={showPassword ? "🙈" : "👁️"}
                    on:tap={togglePasswordVisibility}
                  />
                </gridLayout>

                {#if hasPasswordErrors}
                  <label
                    row="2"
                    text={hasPasswordErrors}
                    textWrap="true"
                  />
                {/if}
              </gridLayout>

              <gridLayout row="2" rows="auto, auto">
                <button
                  row="0"
                  isEnabled={isSubmitEnabled}
                  text="Sign in"
                  on:tap={login}
                />
                {#if loginError}
                  <label
                    row="1"
                    text={loginError}
                    textWrap="true"
                  />
                {/if}
              </gridLayout>
              <gridLayout row="3">
                <button
                  row="0"
                  text="Forgot password??"
                  on:tap={forgotPassword}
                ></button>
              </gridLayout>
            </gridLayout>
          </gridLayout>

          <gridLayout row="1" rows="auto, auto"
            verticalAlignment="bottom"
            horizontalAlignment="center"
          >
            <label
              row="0"
              text="Powered by Yuor Company Inc."
            ></label>
            <label horizontalAlignment="center"
              row="1"
              text="© Copyright 2018"
            ></label>
          </gridLayout>
        </gridLayout>
      </gridLayout>
    </stackLayout>
  </scrollView>
</page>

<style>
</style>

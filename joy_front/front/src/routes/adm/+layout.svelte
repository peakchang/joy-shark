<script>
	import {
		Drawer,
		Button,
		CloseButton,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownWrapper,
		SidebarDropdownItem,
	} from "flowbite-svelte";
	import { sineIn } from "svelte/easing";
	import "$src/app.pcss";

	import { admin_sidebar } from "$src/lib/store";

	// 바탕을 클릭하면 액션을 줄지 말지
	let activateClickOutside = false;

	// 바탕을 클릭하면 drawer을 닫을지 말지
	let backdrop = false;

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn,
	};
</script>

<svelte:head>
	<!-- SUIT 폰트 CSS -->
	<link
		href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="fixed top-0 left-0 w-full bg-stone-300 py-2 px-6 suit-font"
	class:ml-52={!$admin_sidebar}
>
	<button on:click={() => ($admin_sidebar = !$admin_sidebar)}>
		<i class="fa-solid fa-bars" />
	</button>

	<div class="inline-block">
		<div class="flex">
			<a href="/" class="flex items-center gap-2">
				<span>
					<svg
						class="w-3 h-3 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
						/>
					</svg>
				</span>

				<span> Home </span>
			</a>

			<span class="mx-3">|</span>
		</div>
	</div>
</div>

<Drawer
	{activateClickOutside}
	{backdrop}
	transitionType="fly"
	{transitionParams}
	bind:hidden={$admin_sidebar}
	class="border-r border-stone-200 suit-font w-52 z-40"
>
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			메뉴
		</h5>
		<CloseButton
			on:click={() => ($admin_sidebar = true)}
			class="mb-4 dark:text-white"
		/>
	</div>

	<Sidebar>
		<SidebarWrapper
			divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800"
		>
			<SidebarGroup>
				<SidebarItem
					label="기본설정"
					href="/adm"
					on:click={() => {
						console.log("씨발 해해해해해해");
					}}
				>
					<svelte:fragment slot="icon">
						<svg
							class="w-4 h-4 text-gray-800 dark:text-white"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem
					label="서브도메인"
					href="/adm/subdomain"
					on:click={() => {}}
				>
					<svelte:fragment slot="icon">
						<svg
							class="w-4 h-4 text-gray-800 dark:text-white"
							fill="none"
							viewBox="0 0 17 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>

				<!-- <SidebarDropdownWrapper label="드롭다운 체크">
					<svelte:fragment slot="icon">
						<i class="fa-solid fa-vial" />
					</svelte:fragment>
					<SidebarDropdownItem label="여기가 이름" />
				</SidebarDropdownWrapper> -->
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<slot />

<style>
	:global(.suit-font) {
		font-family: "SUIT";
	}
</style>

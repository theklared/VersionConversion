createModSpace(4);
let converterInstance = null;

const possibleLinks = {
	Issues: "issues_url",
	Source: "source_url",
	Wiki: "wiki_url",
	Discord: "discord_url",
};

// jesus christ kill me already why are svgs so bad
const icons = {
	Issues: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0M12 9v4M12 17h.01"></path></svg>',
	Source: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"></path></svg>',
	Wiki: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
	Discord:
		'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="currentColor" viewBox="0 0 50 50"><path d="M 18.90625 7 C 18.90625 7 12.539063 7.4375 8.375 10.78125 C 8.355469 10.789063 8.332031 10.800781 8.3125 10.8125 C 7.589844 11.480469 7.046875 12.515625 6.375 14 C 5.703125 15.484375 4.992188 17.394531 4.34375 19.53125 C 3.050781 23.808594 2 29.058594 2 34 C 1.996094 34.175781 2.039063 34.347656 2.125 34.5 C 3.585938 37.066406 6.273438 38.617188 8.78125 39.59375 C 11.289063 40.570313 13.605469 40.960938 14.78125 41 C 15.113281 41.011719 15.429688 40.859375 15.625 40.59375 L 18.0625 37.21875 C 20.027344 37.683594 22.332031 38 25 38 C 27.667969 38 29.972656 37.683594 31.9375 37.21875 L 34.375 40.59375 C 34.570313 40.859375 34.886719 41.011719 35.21875 41 C 36.394531 40.960938 38.710938 40.570313 41.21875 39.59375 C 43.726563 38.617188 46.414063 37.066406 47.875 34.5 C 47.960938 34.347656 48.003906 34.175781 48 34 C 48 29.058594 46.949219 23.808594 45.65625 19.53125 C 45.007813 17.394531 44.296875 15.484375 43.625 14 C 42.953125 12.515625 42.410156 11.480469 41.6875 10.8125 C 41.667969 10.800781 41.644531 10.789063 41.625 10.78125 C 37.460938 7.4375 31.09375 7 31.09375 7 C 31.019531 6.992188 30.949219 6.992188 30.875 7 C 30.527344 7.046875 30.234375 7.273438 30.09375 7.59375 C 30.09375 7.59375 29.753906 8.339844 29.53125 9.40625 C 27.582031 9.09375 25.941406 9 25 9 C 24.058594 9 22.417969 9.09375 20.46875 9.40625 C 20.246094 8.339844 19.90625 7.59375 19.90625 7.59375 C 19.734375 7.203125 19.332031 6.964844 18.90625 7 Z M 18.28125 9.15625 C 18.355469 9.359375 18.40625 9.550781 18.46875 9.78125 C 16.214844 10.304688 13.746094 11.160156 11.4375 12.59375 C 11.074219 12.746094 10.835938 13.097656 10.824219 13.492188 C 10.816406 13.882813 11.039063 14.246094 11.390625 14.417969 C 11.746094 14.585938 12.167969 14.535156 12.46875 14.28125 C 17.101563 11.410156 22.996094 11 25 11 C 27.003906 11 32.898438 11.410156 37.53125 14.28125 C 37.832031 14.535156 38.253906 14.585938 38.609375 14.417969 C 38.960938 14.246094 39.183594 13.882813 39.175781 13.492188 C 39.164063 13.097656 38.925781 12.746094 38.5625 12.59375 C 36.253906 11.160156 33.785156 10.304688 31.53125 9.78125 C 31.59375 9.550781 31.644531 9.359375 31.71875 9.15625 C 32.859375 9.296875 37.292969 9.894531 40.3125 12.28125 C 40.507813 12.460938 41.1875 13.460938 41.8125 14.84375 C 42.4375 16.226563 43.09375 18.027344 43.71875 20.09375 C 44.9375 24.125 45.921875 29.097656 45.96875 33.65625 C 44.832031 35.496094 42.699219 36.863281 40.5 37.71875 C 38.5 38.496094 36.632813 38.84375 35.65625 38.9375 L 33.96875 36.65625 C 34.828125 36.378906 35.601563 36.078125 36.28125 35.78125 C 38.804688 34.671875 40.15625 33.5 40.15625 33.5 C 40.570313 33.128906 40.605469 32.492188 40.234375 32.078125 C 39.863281 31.664063 39.226563 31.628906 38.8125 32 C 38.8125 32 37.765625 32.957031 35.46875 33.96875 C 34.625 34.339844 33.601563 34.707031 32.4375 35.03125 C 32.167969 35 31.898438 35.078125 31.6875 35.25 C 29.824219 35.703125 27.609375 36 25 36 C 22.371094 36 20.152344 35.675781 18.28125 35.21875 C 18.070313 35.078125 17.8125 35.019531 17.5625 35.0625 C 16.394531 34.738281 15.378906 34.339844 14.53125 33.96875 C 12.234375 32.957031 11.1875 32 11.1875 32 C 10.960938 31.789063 10.648438 31.699219 10.34375 31.75 C 9.957031 31.808594 9.636719 32.085938 9.53125 32.464844 C 9.421875 32.839844 9.546875 33.246094 9.84375 33.5 C 9.84375 33.5 11.195313 34.671875 13.71875 35.78125 C 14.398438 36.078125 15.171875 36.378906 16.03125 36.65625 L 14.34375 38.9375 C 13.367188 38.84375 11.5 38.496094 9.5 37.71875 C 7.300781 36.863281 5.167969 35.496094 4.03125 33.65625 C 4.078125 29.097656 5.0625 24.125 6.28125 20.09375 C 6.90625 18.027344 7.5625 16.226563 8.1875 14.84375 C 8.8125 13.460938 9.492188 12.460938 9.6875 12.28125 C 12.707031 9.894531 17.140625 9.296875 18.28125 9.15625 Z M 18.5 21 C 15.949219 21 14 23.316406 14 26 C 14 28.683594 15.949219 31 18.5 31 C 21.050781 31 23 28.683594 23 26 C 23 23.316406 21.050781 21 18.5 21 Z M 31.5 21 C 28.949219 21 27 23.316406 27 26 C 27 28.683594 28.949219 31 31.5 31 C 34.050781 31 36 28.683594 36 26 C 36 23.316406 34.050781 21 31.5 21 Z M 18.5 23 C 19.816406 23 21 24.265625 21 26 C 21 27.734375 19.816406 29 18.5 29 C 17.183594 29 16 27.734375 16 26 C 16 24.265625 17.183594 23 18.5 23 Z M 31.5 23 C 32.816406 23 34 24.265625 34 26 C 34 27.734375 32.816406 29 31.5 29 C 30.183594 29 29 27.734375 29 26 C 29 24.265625 30.183594 23 31.5 23 Z"></path></svg>',
	Followers:
		'<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="h-6 w-6 text-secondary"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"></path></svg>',
	Downloads:
		'<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="h-6 w-6 text-secondary"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4"></path></svg>',
	Published:
		'<svg data-v-f415f334="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"></path></svg>',
	Updated:
		'<svg data-v-f415f334="" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M1.05 12H7M17.01 12h5.95"></path></svg>',
};
const externalLink =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="external"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"></path></svg>';

class Converter {
	constructor(files) {
		this.files = files;
		this.downloadReady = false;
		this.valid_versions = null;
	}

	async hashFile(file, algorithm) {
		const arrayBuffer = await file.arrayBuffer();
		const digest = await crypto.subtle.digest(algorithm, arrayBuffer);
		return Array.from(new Uint8Array(digest))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
	}

	async getHash(file) {
		const sha1 = await this.hashFile(file, "SHA-1");
		const sha512 = await this.hashFile(file, "SHA-512");

		const res = await fetch(`https://api.modrinth.com/v2/version_file/${sha1}?algorithm=sha1`);
		if (!res.ok) console.error("Not found:", res.status, await res.text());

		const data = await res.json();
		return [true, data.project_id];
	}

	async loadSVG(path) {
		const res = await fetch(path);
		return await res.text();
	}

	convertTime(timestamp) {
		const now = new Date();
		const then = new Date(timestamp);
		const seconds = Math.floor((now - then) / 1000);

		const intervals = [
			{ label: "year", seconds: 31536000 },
			{ label: "month", seconds: 2592000 },
			{ label: "day", seconds: 86400 },
			{ label: "hour", seconds: 3600 },
			{ label: "minute", seconds: 60 },
			{ label: "second", seconds: 1 },
		];

		for (let i of intervals) {
			const count = Math.floor(seconds / i.seconds);
			if (count >= 1) {
				return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
			}
		}
		return "just now";
	}

	async writeModInfo(mod) {
		mod.modrinth = {};
		mod.modrinth.creators = [];
		const res = await fetch(`https://api.modrinth.com/v2/team/${mod.team}/members`);
		if (!res.ok) return;

		const data = await res.json();
		const members = Object.values(data).reverse();
		members.forEach((user) => {
			mod.modrinth.creators.push({ name: user.user.username, url: user.user.avatar_url, role: user.role });
		});

		mod.modrinth.links = [];

		for (const [type, key] of Object.entries(possibleLinks)) {
			const url = mod[key];
			if (url) {
				mod.modrinth.links.push({ type, url });
			}
		}

		let updated = this.convertTime(mod.updated);
		let published = this.convertTime(mod.published);

		mod.modrinth.details = {
			Followers: mod.followers,
			Downloads: mod.downloads,
			Updated: updated,
			Published: published,
		};
	}

	async loadModInfo(mod) {
		if (!mod.modrinth) await this.writeModInfo(mod);

		creators.innerHTML = "";
		mod.modrinth.creators.forEach((user) => {
			const a = document.createElement("a");
			a.href = `https://modrinth.com/user/${user.name}`;
			a.target = "_blank";

			const icon = `<img class="pfp" src="${user.url}" alt="${user.name}"></img>`;
			a.innerHTML = `${icon} <span>${user.name}</span>`;

			creators.appendChild(a);
		});

		links.innerHTML = "";
		mod.modrinth.links.forEach((link) => {
			const a = document.createElement("a");
			a.href = link.url;
			a.target = "_blank";

			a.innerHTML = `${icons[link.type]} <span>${link.type}</span> ${externalLink}`;

			links.appendChild(a);
		});

		details.innerHTML = "";

		Object.entries(mod.modrinth.details).forEach(([key, value]) => {
			const p = document.createElement("p");
			p.innerHTML = `${icons[key]} <span>${value}</span>`;

			details.append(p);
		});
	}

	async fetchModrinthInfo(id) {
		try {
			const projectUrl = `https://api.modrinth.com/v2/project/${id}`;
			const versionsUrl = `https://api.modrinth.com/v2/project/${id}/version`;

			const [projectRes, versionsRes] = await Promise.all([fetch(projectUrl), fetch(versionsUrl)]);

			if (!projectRes.ok || !versionsRes.ok) {
				return false;
			}

			const projectInfo = await projectRes.json();
			const versionInfo = await versionsRes.json();
			return { ...projectInfo, versionInfo };
		} catch (error) {
			console.error("Failed to fetch info:", error);
		}
	}

	async downloadConverts() {
		const files = this.files;

		// i want die
		if (window.showDirectoryPicker) {
			try {
				const dirHandle = await window.showDirectoryPicker();
				const active = new Set();

				for (const file of files) {
					const task = (async () => {
						const res = await fetch(file.converted.url);
						if (!res.ok) throw new Error(`Failed: ${file.converted.url}`);

						const fileHandle = await dirHandle.getFileHandle(file.converted.fileName, { create: true });
						const writable = await fileHandle.createWritable();
						await res.body.pipeTo(writable);
					})();

					active.add(task);
					task.finally(() => active.delete(task));

					if (active.size >= 5) {
						await Promise.race(active);
					}
				}

				await Promise.all(active);
				return true;
			} catch (err) {
				console.warn("User denied directory access or error:", err);
			}
		}

		const tasks = files.map(async (file) => {
			const res = await fetch(file.converted.url);
			if (!res.ok) throw new Error(`Failed: ${file.converted.url}`);
			const blob = await res.blob();
			return { name: file.converted.fileName, blob };
		});

		const results = await Promise.all(tasks);

		const zip = new JSZip();
		results.forEach(({ name, blob }) => {
			zip.file(name, blob);
		});

		const zipBlob = await zip.generateAsync({ type: "blob" });

		const a = document.createElement("a");
		a.href = URL.createObjectURL(zipBlob);
		a.download = "mods.zip";
		a.click();

		this.files = [];
		const container = document.getElementById("modContainer");
		container.innerHTML = "";

		creators.innerHTML = "";
		links.innerHTML = "";
		details.innerHTML = "";

		createModSpace(4);
	}

	async convertFiles() {
		for (const file of this.files) {
			if (file.converted) continue;

			const [found, id] = await this.getHash(file.file);
			if (!found) continue;

			const info = await this.fetchModrinthInfo(id);
			if (!info) return;

			let valid_versions = info.versionInfo.filter(
				(v) =>
					(`${modLoaderSelection.value}` == "None" || v.loaders[0].toLowerCase() === modLoaderSelection.value) &&
					v.game_versions.includes(versionSelection.value)
			);

			if (!valid_versions[0]) {
				createError(`${info.title} for ${modLoaderSelection.value} ${versionSelection.value} not found.`);

				let index = files.indexOf(file);
				if (index !== -1) files.splice(index, 1);
				continue;
			}

			let preview = getUnusedModSpace();
			if (preview) {
				const wrapper = document.createElement("div");
				wrapper.classList.add("preview-wrapper");

				const img = document.createElement("img");
				img.src = info.icon_url;
				img.alt = info.title;
				img.classList.add("preview-img");
				img.addEventListener("click", () => {
					this.loadModInfo(info);
				});

				wrapper.appendChild(img);

				const caption = document.createElement("div");
				caption.textContent = `${info.title} ${versionSelection.value}`;
				caption.classList.add("preview-caption");

				wrapper.appendChild(caption);
				preview.appendChild(wrapper);
			}

			file.converted = {
				url: valid_versions[0]["files"][0]["url"],
				fileName: valid_versions[0]["files"][0]["filename"],
			};
		}

		this.downloadReady = true;
	}
}

function getUnusedModSpace() {
	const modBoxes = document.querySelectorAll(".modBox");
	for (const box of modBoxes) {
		if (box.getAttribute("data-used") === "false") {
			box.setAttribute("data-used", "true");
			return box;
		}
	}

	createModSpace(1);
	return getUnusedModSpace();
}

function createModSpace(amount) {
	const container = document.getElementById("modContainer");
	for (let i = 1; i <= amount; i++) {
		const box = document.createElement("div");
		box.classList.add("modBox");
		box.setAttribute("data-used", "false");
		box.setAttribute("id", `modBox-${i}`);
		container.appendChild(box);
	}
}

const files = [];

function addFiles(fileList) {
	for (const file of fileList) {
		const isJar = file.type === "application/java-archive" || file.name.toLowerCase().endsWith(".jar");
		const isPack = file.name.toLowerCase().endsWith(".mrpack") || file.name.toLowerCase().endsWith(".zip");

		if (!isJar && !isPack) continue;

		files.push({ file });
	}

	const dropInfo = document.getElementById("temperaryDropInfo");
	if (dropInfo) dropInfo.remove();
}

function dropHandler(event) {
	event.preventDefault();
	addFiles(event.dataTransfer.files);
}

const dropZone = document.getElementById("dropZone");
dropZone.addEventListener("drop", dropHandler);
dropZone.addEventListener("dragover", (event) => event.preventDefault());

const creators = document.getElementById("creators");
const links = document.getElementById("links");
const details = document.getElementById("details");

const githubTokenInput = document.getElementById("githubToken");
const githubRepoInput = document.getElementById("githubRepo");
const githubConnectButton = document.getElementById("githubConnectButton");
const githubStatus = document.getElementById("githubStatus");
const storedToken = sessionStorage.getItem("githubToken");
if (storedToken) {
	githubTokenInput.value = storedToken;
	githubStatus.textContent = "GitHub token loaded for this session.";
}

function setGithubStatus(message, isError = false) {
	githubStatus.textContent = message;
	githubStatus.style.color = isError ? "#ff9999" : "#b0bac5";
}

githubConnectButton.addEventListener("click", () => {
	const token = githubTokenInput.value.trim();
	if (!token) {
		setGithubStatus("Add a GitHub token to continue.", true);
		return;
	}

	sessionStorage.setItem("githubToken", token);
	setGithubStatus("GitHub token saved for this session.");
});

const importButton = document.getElementById("importButton");
const fileInput = document.getElementById("fileInput");
importButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (event) => {
	addFiles(event.target.files);
	event.target.value = "";
});

async function getGithubUser(token) {
	const res = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `token ${token}`,
			Accept: "application/vnd.github+json",
		},
	});

	if (!res.ok) {
		throw new Error("GitHub authentication failed.");
	}

	return await res.json();
}

async function createGithubRepo(token, name) {
	const res = await fetch("https://api.github.com/user/repos", {
		method: "POST",
		headers: {
			Authorization: `token ${token}`,
			Accept: "application/vnd.github+json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			private: false,
			auto_init: true,
		}),
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Failed to create GitHub repo.");
	}

	return await res.json();
}

async function uploadGithubFile({ owner, repo, token, path, content, message }) {
	const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
		method: "PUT",
		headers: {
			Authorization: `token ${token}`,
			Accept: "application/vnd.github+json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			message,
			content,
		}),
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || `Failed to upload ${path}.`);
	}
}

function toBase64(buffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const chunkSize = 0x8000;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		const chunk = bytes.subarray(i, i + chunkSize);
		binary += String.fromCharCode(...chunk);
	}
	return btoa(binary);
}

const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", async function () {
	if (files.length === 0) return;

	this.textContent = "Converting...";
	this.style.backgroundColor = "transparent";

	if (!converterInstance) {
		converterInstance = new Converter(files);
	}

	await converterInstance.convertFiles();

	this.textContent = "Convert";
	this.style.backgroundColor = "#4cce68";
});

const publishButton = document.getElementById("publishButton");
publishButton.addEventListener("click", async function () {
	if (!converterInstance || !converterInstance.downloadReady) {
		createError("Convert files before publishing to GitHub.");
		return;
	}

	const token = githubTokenInput.value.trim();
	if (!token) {
		setGithubStatus("Add a GitHub token before publishing.", true);
		return;
	}

	const repoName = githubRepoInput.value.trim() || `mod-conversion-${Date.now()}`;

	this.textContent = "Publishing...";
	this.style.backgroundColor = "transparent";

	try {
		const user = await getGithubUser(token);
		const repo = await createGithubRepo(token, repoName);

		const workflow = `name: Build Mods\n\non:\n  push:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build (if Gradle present)\n        run: |\n          if [ -f gradlew ]; then\n            chmod +x gradlew\n            ./gradlew build\n          else\n            echo \"No Gradle project found.\"\n          fi\n      - name: Upload JARs\n        uses: actions/upload-artifact@v4\n        with:\n          name: built-jars\n          path: \"**/*.jar\"\n`;

		const readme = `# Mod Conversion Output\n\nThis repo was generated by the Version Converter.\n\nConverted files are stored in the repository root.\n`;

		await uploadGithubFile({
			owner: user.login,
			repo: repo.name,
			token,
			path: ".github/workflows/build.yml",
			content: btoa(workflow),
			message: "Add build workflow",
		});

		await uploadGithubFile({
			owner: user.login,
			repo: repo.name,
			token,
			path: "README.md",
			content: btoa(readme),
			message: "Add README",
		});

		for (const file of files) {
			if (!file.converted) continue;
			const res = await fetch(file.converted.url);
			if (!res.ok) throw new Error(`Failed to fetch ${file.converted.fileName}.`);
			const buffer = await res.arrayBuffer();
			const base64 = toBase64(buffer);

			await uploadGithubFile({
				owner: user.login,
				repo: repo.name,
				token,
				path: file.converted.fileName,
				content: base64,
				message: `Add ${file.converted.fileName}`,
			});
		}

		setGithubStatus(`Published to ${repo.full_name}.`);
	} catch (error) {
		console.error(error);
		setGithubStatus(error.message || "Publishing failed.", true);
	} finally {
		this.textContent = "Publish to GitHub";
		this.style.backgroundColor = "#5a5ad6";
	}
});

const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", async function () {
	if (!converterInstance || !converterInstance.downloadReady) return;

	this.textContent = "Downloading...";
	this.style.backgroundColor = "transparent";

	await converterInstance.downloadConverts();

	this.textContent = "Download";
	this.style.backgroundColor = "#b48725";
});

const modLoaderSelection = document.getElementById("modLoaderSelection");
const versionSelection = document.getElementById("versionSelection");
fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json")
	.then((res) => res.json())
	.then((data) => {
		data.versions
			.filter((v) => v.type === "release")
			.forEach((v) => {
				const option = document.createElement("option");
				option.value = v.id;
				option.textContent = v.id;
				versionSelection.appendChild(option);
			});
	});

// jesus christ
const errorContainer = document.createElement("div");
errorContainer.style.position = "fixed";
errorContainer.style.bottom = "1rem";
errorContainer.style.left = "50%";
errorContainer.style.transform = "translateX(-50%)";
errorContainer.style.display = "flex";
errorContainer.style.flexDirection = "column-reverse";
errorContainer.style.gap = "0.5rem";
document.body.appendChild(errorContainer);

function createError(message) {
	if (errorContainer.children.length >= 5) {
		errorContainer.removeChild(errorContainer.firstElementChild);
	}

	const box = document.createElement("div");
	box.className = "errorBox";

	const text = document.createElement("span");
	text.className = "errorText";
	text.textContent = message;

	const close = document.createElement("button");
	close.className = "errorCloseBtn";
	close.setAttribute("aria-label", "Dismiss error");
	close.innerHTML = "&times;";

	const dismiss = () => {
		box.remove();
	};

	close.addEventListener("click", dismiss);

	box.appendChild(text);
	box.appendChild(close);
	errorContainer.appendChild(box);

	return box;
}

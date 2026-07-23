import { GeneratorSettings } from '@/components/Generator';
import { TaskfileAddons } from '@/components/Generator/GeneredTaskfile/taskfile';
import loadTemplate from '@/helpers/loadTemplate';
import setLocalHostsSh from './set-local-hosts.sh';

const localHosts = (settings: GeneratorSettings, addon: TaskfileAddons): void => {
	if (!settings.localHosts) {
		return;
	}

	const domains = (settings.localDomains ?? []).map((entry) => entry.domain.trim()).filter(Boolean);

	if (domains.length === 0) {
		return;
	}

	addon.projectFunctions.push(
		loadTemplate(setLocalHostsSh, {
			project: settings.project || 'Taskfile',
			domains: domains.map((domain) => `\t\t"${domain}"`).join('\n'),
		})
	);

	addon.initCheckCommands.push('task:set-local-hosts');
};

export default localHosts;

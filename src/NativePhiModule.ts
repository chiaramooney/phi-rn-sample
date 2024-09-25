import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getPhiResponse(prompt: string) : Promise<string>;
}

export default TurboModuleRegistry.get<Spec>(
  'PhiModule'
) as Spec | null;
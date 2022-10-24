import { SetMetadata } from '@nestjs/common';

export const AUDITABLE_KEY = 'endpointAuditable';

export const Auditable = () => SetMetadata(AUDITABLE_KEY, true);

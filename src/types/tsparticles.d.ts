declare module "@tsparticles/React" {
    export * from "@tsparticles/react";
    import * as React from "react";

    // Add missing types and functions
    const Particles: React.FC<any>;
    export default Particles;
    export function initParticlesEngine(callback: any): Promise<any>;
}

declare module "@tsparticles/engine" {
    // This ensures TypeScript knows about this module
    export type Container = any;
    export type SingleOrMultiple<T> = T | T[];
}

declare module "@tsparticles/slim" {
    // This ensures TypeScript knows about this module
    export function loadSlim(engine: any): Promise<any>;
}

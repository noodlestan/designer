export type PackageMeta = { path: string };

export type PackageJson = {
    name: string;
    version: string;
    private?: boolean;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

export type PackageData = {
    meta: PackageMeta & { filename: string };
    data: PackageJson;
};

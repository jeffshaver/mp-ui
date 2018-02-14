const deployments = [
  {
    apiVersion: 'extensions/v1beta1',
    kind: 'Deployment',
    metadata: {
      annotations: {
        'deployment.kubernetes.io/revision': '1',
        'kubectl.kubernetes.io/last-applied-configuration':
          '{"apiVersion":"extensions/v1beta1","kind":"Deployment","metadata":{"annotations":{},"labels":{"addonmanager.kubernetes.io/mode":"Reconcile","k8s-app":"kube-dns","version":"v20"},"name":"kube-dns","namespace":"kube-system"},"spec":{"replicas":1,"selector":{"matchLabels":{"k8s-app":"kube-dns"}},"template":{"metadata":{"annotations":{"scheduler.alpha.kubernetes.io/critical-pod":""},"labels":{"k8s-app":"kube-dns"}},"spec":{"containers":[{"args":["--domain=cluster.local.","--dns-port=10053","--config-map=kube-dns","--v=2"],"env":[{"name":"PROMETHEUS_PORT","value":"10055"}],"image":"k8s.gcr.io/k8s-dns-kube-dns-amd64:1.14.5","imagePullPolicy":"IfNotPresent","livenessProbe":{"failureThreshold":5,"httpGet":{"path":"/healthcheck/kubedns","port":10054,"scheme":"HTTP"},"initialDelaySeconds":60,"successThreshold":1,"timeoutSeconds":5},"name":"kubedns","ports":[{"containerPort":10053,"name":"dns-local","protocol":"UDP"},{"containerPort":10053,"name":"dns-tcp-local","protocol":"TCP"},{"containerPort":10055,"name":"metrics","protocol":"TCP"}],"readinessProbe":{"httpGet":{"path":"/readiness","port":8081,"scheme":"HTTP"},"initialDelaySeconds":3,"timeoutSeconds":5},"resources":{"limits":{"memory":"170Mi"},"requests":{"cpu":"100m","memory":"70Mi"}},"volumeMounts":[{"mountPath":"/kube-dns-config","name":"kube-dns-config"}]},{"args":["-v=2","-logtostderr","-configDir=/etc/k8s/dns/dnsmasq-nanny","-restartDnsmasq=true","--","-k","--cache-size=1000","--log-facility=-","--server=/cluster.local/127.0.0.1#10053","--server=/in-addr.arpa/127.0.0.1#10053","--server=/ip6.arpa/127.0.0.1#10053"],"image":"k8s.gcr.io/k8s-dns-dnsmasq-nanny-amd64:1.14.5","imagePullPolicy":"IfNotPresent","livenessProbe":{"failureThreshold":5,"httpGet":{"path":"/healthcheck/dnsmasq","port":10054,"scheme":"HTTP"},"initialDelaySeconds":60,"successThreshold":1,"timeoutSeconds":5},"name":"dnsmasq","ports":[{"containerPort":53,"name":"dns","protocol":"UDP"},{"containerPort":53,"name":"dns-tcp","protocol":"TCP"}],"resources":{"requests":{"cpu":"150m","memory":"20Mi"}},"volumeMounts":[{"mountPath":"/etc/k8s/dns/dnsmasq-nanny","name":"kube-dns-config"}]},{"args":["--v=2","--logtostderr","--probe=kubedns,127.0.0.1:10053,kubernetes.default.svc.cluster.local.,5,A","--probe=dnsmasq,127.0.0.1:53,kubernetes.default.svc.cluster.local.,5,A"],"image":"k8s.gcr.io/k8s-dns-sidecar-amd64:1.14.5","imagePullPolicy":"IfNotPresent","livenessProbe":{"failureThreshold":5,"httpGet":{"path":"/metrics","port":10054,"scheme":"HTTP"},"initialDelaySeconds":60,"successThreshold":1,"timeoutSeconds":5},"name":"sidecar","ports":[{"containerPort":10054,"name":"metrics","protocol":"TCP"}],"resources":{"requests":{"cpu":"10m","memory":"20Mi"}}}],"dnsPolicy":"Default","tolerations":[{"key":"CriticalAddonsOnly","operator":"Exists"}],"volumes":[{"configMap":{"name":"kube-dns","optional":true},"name":"kube-dns-config"}]}}}}\n'
      },
      creationTimestamp: '2018-02-07T18:28:35Z',
      generation: 1,
      labels: {
        'addonmanager.kubernetes.io/mode': 'Reconcile',
        'k8s-app': 'kube-dns',
        version: 'v20'
      },
      name: 'kube-dns',
      namespace: 'kube-system',
      resourceVersion: '324191',
      selfLink:
        '/apis/extensions/v1beta1/namespaces/kube-system/deployments/kube-dns',
      uid: 'b56b6a45-0c34-11e8-b054-08002716f83c'
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          'k8s-app': 'kube-dns'
        }
      },
      strategy: {
        rollingUpdate: {
          maxSurge: 1,
          maxUnavailable: 1
        },
        type: 'RollingUpdate'
      },
      template: {
        metadata: {
          annotations: {
            'scheduler.alpha.kubernetes.io/critical-pod': ''
          },
          creationTimestamp: null,
          labels: {
            'k8s-app': 'kube-dns'
          }
        },
        spec: {
          containers: [
            {
              args: [
                '--domain=cluster.local.',
                '--dns-port=10053',
                '--config-map=kube-dns',
                '--v=2'
              ],
              env: [
                {
                  name: 'PROMETHEUS_PORT',
                  value: '10055'
                }
              ],
              image: 'k8s.gcr.io/k8s-dns-kube-dns-amd64:1.14.5',
              imagePullPolicy: 'IfNotPresent',
              livenessProbe: {
                failureThreshold: 5,
                httpGet: {
                  path: '/healthcheck/kubedns',
                  port: 10054,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                successThreshold: 1,
                timeoutSeconds: 5
              },
              name: 'kubedns',
              ports: [
                {
                  containerPort: 10053,
                  name: 'dns-local',
                  protocol: 'UDP'
                },
                {
                  containerPort: 10053,
                  name: 'dns-tcp-local',
                  protocol: 'TCP'
                },
                {
                  containerPort: 10055,
                  name: 'metrics',
                  protocol: 'TCP'
                }
              ],
              readinessProbe: {
                failureThreshold: 3,
                httpGet: {
                  path: '/readiness',
                  port: 8081,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 3,
                periodSeconds: 10,
                successThreshold: 1,
                timeoutSeconds: 5
              },
              resources: {
                limits: {
                  memory: '170Mi'
                },
                requests: {
                  cpu: '100m',
                  memory: '70Mi'
                }
              },
              terminationMessagePath: '/dev/termination-log',
              terminationMessagePolicy: 'File',
              volumeMounts: [
                {
                  mountPath: '/kube-dns-config',
                  name: 'kube-dns-config'
                }
              ]
            },
            {
              args: [
                '-v=2',
                '-logtostderr',
                '-configDir=/etc/k8s/dns/dnsmasq-nanny',
                '-restartDnsmasq=true',
                '--',
                '-k',
                '--cache-size=1000',
                '--log-facility=-',
                '--server=/cluster.local/127.0.0.1#10053',
                '--server=/in-addr.arpa/127.0.0.1#10053',
                '--server=/ip6.arpa/127.0.0.1#10053'
              ],
              image: 'k8s.gcr.io/k8s-dns-dnsmasq-nanny-amd64:1.14.5',
              imagePullPolicy: 'IfNotPresent',
              livenessProbe: {
                failureThreshold: 5,
                httpGet: {
                  path: '/healthcheck/dnsmasq',
                  port: 10054,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                successThreshold: 1,
                timeoutSeconds: 5
              },
              name: 'dnsmasq',
              ports: [
                {
                  containerPort: 53,
                  name: 'dns',
                  protocol: 'UDP'
                },
                {
                  containerPort: 53,
                  name: 'dns-tcp',
                  protocol: 'TCP'
                }
              ],
              resources: {
                requests: {
                  cpu: '150m',
                  memory: '20Mi'
                }
              },
              terminationMessagePath: '/dev/termination-log',
              terminationMessagePolicy: 'File',
              volumeMounts: [
                {
                  mountPath: '/etc/k8s/dns/dnsmasq-nanny',
                  name: 'kube-dns-config'
                }
              ]
            },
            {
              args: [
                '--v=2',
                '--logtostderr',
                '--probe=kubedns,127.0.0.1:10053,kubernetes.default.svc.cluster.local.,5,A',
                '--probe=dnsmasq,127.0.0.1:53,kubernetes.default.svc.cluster.local.,5,A'
              ],
              image: 'k8s.gcr.io/k8s-dns-sidecar-amd64:1.14.5',
              imagePullPolicy: 'IfNotPresent',
              livenessProbe: {
                failureThreshold: 5,
                httpGet: {
                  path: '/metrics',
                  port: 10054,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 60,
                periodSeconds: 10,
                successThreshold: 1,
                timeoutSeconds: 5
              },
              name: 'sidecar',
              ports: [
                {
                  containerPort: 10054,
                  name: 'metrics',
                  protocol: 'TCP'
                }
              ],
              resources: {
                requests: {
                  cpu: '10m',
                  memory: '20Mi'
                }
              },
              terminationMessagePath: '/dev/termination-log',
              terminationMessagePolicy: 'File'
            }
          ],
          dnsPolicy: 'Default',
          restartPolicy: 'Always',
          schedulerName: 'default-scheduler',
          securityContext: {},
          terminationGracePeriodSeconds: 30,
          tolerations: [
            {
              key: 'CriticalAddonsOnly',
              operator: 'Exists'
            }
          ],
          volumes: [
            {
              configMap: {
                defaultMode: 420,
                name: 'kube-dns',
                optional: true
              },
              name: 'kube-dns-config'
            }
          ]
        }
      }
    },
    status: {
      availableReplicas: 1,
      conditions: [
        {
          lastTransitionTime: '2018-02-07T18:28:35Z',
          lastUpdateTime: '2018-02-07T18:28:35Z',
          message: 'Deployment has minimum availability.',
          reason: 'MinimumReplicasAvailable',
          status: 'True',
          type: 'Available'
        }
      ],
      observedGeneration: 1,
      readyReplicas: 1,
      replicas: 1,
      updatedReplicas: 1
    }
  },
  {
    apiVersion: 'extensions/v1beta1',
    kind: 'Deployment',
    metadata: {
      annotations: {
        'deployment.kubernetes.io/revision': '1',
        'kubectl.kubernetes.io/last-applied-configuration':
          '{"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"addonmanager.kubernetes.io/mode":"Reconcile","kubernetes.io/minikube-addons":"dashboard","version":"v1.8.1"},"name":"kubernetes-dashboard","namespace":"kube-system"},"spec":{"replicas":1,"selector":{"matchLabels":{"addonmanager.kubernetes.io/mode":"Reconcile","app":"kubernetes-dashboard","version":"v1.8.1"}},"template":{"metadata":{"labels":{"addonmanager.kubernetes.io/mode":"Reconcile","app":"kubernetes-dashboard","version":"v1.8.1"}},"spec":{"containers":[{"image":"k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.1","imagePullPolicy":"IfNotPresent","livenessProbe":{"httpGet":{"path":"/","port":9090},"initialDelaySeconds":30,"timeoutSeconds":30},"name":"kubernetes-dashboard","ports":[{"containerPort":9090,"protocol":"TCP"}]}]}}}}\n'
      },
      creationTimestamp: '2018-02-07T18:28:35Z',
      generation: 1,
      labels: {
        'addonmanager.kubernetes.io/mode': 'Reconcile',
        'kubernetes.io/minikube-addons': 'dashboard',
        version: 'v1.8.1'
      },
      name: 'kubernetes-dashboard',
      namespace: 'kube-system',
      resourceVersion: '324199',
      selfLink:
        '/apis/extensions/v1beta1/namespaces/kube-system/deployments/kubernetes-dashboard',
      uid: 'b546e047-0c34-11e8-b054-08002716f83c'
    },
    spec: {
      progressDeadlineSeconds: 600,
      replicas: 1,
      revisionHistoryLimit: 10,
      selector: {
        matchLabels: {
          'addonmanager.kubernetes.io/mode': 'Reconcile',
          app: 'kubernetes-dashboard',
          version: 'v1.8.1'
        }
      },
      strategy: {
        rollingUpdate: {
          maxSurge: '25%',
          maxUnavailable: '25%'
        },
        type: 'RollingUpdate'
      },
      template: {
        metadata: {
          creationTimestamp: null,
          labels: {
            'addonmanager.kubernetes.io/mode': 'Reconcile',
            app: 'kubernetes-dashboard',
            version: 'v1.8.1'
          }
        },
        spec: {
          containers: [
            {
              image: 'k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.1',
              imagePullPolicy: 'IfNotPresent',
              livenessProbe: {
                failureThreshold: 3,
                httpGet: {
                  path: '/',
                  port: 9090,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 30,
                periodSeconds: 10,
                successThreshold: 1,
                timeoutSeconds: 30
              },
              name: 'kubernetes-dashboard',
              ports: [
                {
                  containerPort: 9090,
                  protocol: 'TCP'
                }
              ],
              resources: {},
              terminationMessagePath: '/dev/termination-log',
              terminationMessagePolicy: 'File'
            }
          ],
          dnsPolicy: 'ClusterFirst',
          restartPolicy: 'Always',
          schedulerName: 'default-scheduler',
          securityContext: {},
          terminationGracePeriodSeconds: 30
        }
      }
    },
    status: {
      availableReplicas: 1,
      conditions: [
        {
          lastTransitionTime: '2018-02-07T18:28:35Z',
          lastUpdateTime: '2018-02-07T18:28:37Z',
          message:
            'ReplicaSet "kubernetes-dashboard-77d8b98585" has successfully progressed.',
          reason: 'NewReplicaSetAvailable',
          status: 'True',
          type: 'Progressing'
        },
        {
          lastTransitionTime: '2018-02-14T14:48:43Z',
          lastUpdateTime: '2018-02-14T14:48:43Z',
          message: 'Deployment has minimum availability.',
          reason: 'MinimumReplicasAvailable',
          status: 'True',
          type: 'Available'
        }
      ],
      observedGeneration: 1,
      readyReplicas: 1,
      replicas: 1,
      updatedReplicas: 1
    }
  }
]

export default deployments
